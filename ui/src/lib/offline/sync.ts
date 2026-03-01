let pouchdbModule: { default: any } | null = null;

const loadPouchDB = async () => {
  if (typeof window === 'undefined') {
    throw new Error('PouchDB can only be initialized in the browser.');
  }
  if (!pouchdbModule) {
    pouchdbModule = await import('pouchdb-browser');
  }
  return pouchdbModule.default;
};

export class OfflineSync {
  private dbName: string;
  private localDB: any | null = null;
  private remoteDB: any | null = null;
  private syncHandler: any | null = null;

  constructor(dbName: string) {
    this.dbName = dbName;
  }

  private async ensureLocalDB() {
    if (!this.localDB) {
      const PouchDB = await loadPouchDB();
      this.localDB = new PouchDB(this.dbName);
    }
    return this.localDB;
  }

  async setupSync(remoteUrl: string) {
    const localDB = await this.ensureLocalDB();
    const PouchDB = await loadPouchDB();
    this.remoteDB = new PouchDB(remoteUrl);
    this.syncHandler = localDB
      .sync(this.remoteDB, {
        live: true,
        retry: true,
      })
      .on('change', (info: any) => {
        console.log('Sync change:', info);
        // Best-effort conflict resolution on changed docs
        const docs = (info as any)?.change?.docs || [];
        for (const d of docs) {
          if (d?._id) {
            void this.resolveConflicts(d._id);
          }
        }
      })
      .on('error', (err: unknown) => {
        console.error('Sync error:', err);
      });
  }

  cancelSync() {
    this.syncHandler?.cancel();
    this.syncHandler = null;
    this.remoteDB = null;
  }

  async put(doc: any) {
    const db = await this.ensureLocalDB();
    return db.put(doc);
  }

  async get(id: string) {
    const db = await this.ensureLocalDB();
    return db.get(id);
  }

  private async resolveConflicts(id: string) {
    try {
      const db = await this.ensureLocalDB();
      const doc: any = await db.get(id, { conflicts: true });
      const conflicts: string[] = doc?._conflicts || [];
      if (!conflicts.length) return;

      const candidates: any[] = [doc];
      for (const rev of conflicts) {
        const other = await db.get(id, { rev });
        candidates.push(other);
      }

      const pick = candidates
        .map((c) => {
          const t = Date.parse(c.updatedAt || c.updated_at || c.createdAt || c.created_at || 0);
          return { c, t: Number.isFinite(t) ? t : 0 };
        })
        .sort((a, b) => b.t - a.t)[0]?.c;

      if (!pick) return;

      // Delete losing revisions
      const winnersRev = pick._rev;
      for (const c of candidates) {
        if (c._rev !== winnersRev) {
          await db.put({ _id: id, _rev: c._rev, _deleted: true });
        }
      }
    } catch {
      // ignore conflict resolution failures
    }
  }
}
