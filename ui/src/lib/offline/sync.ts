import PouchDB from 'pouchdb';

export class OfflineSync {
  private localDB: PouchDB.Database;
  private remoteDB: PouchDB.Database | null = null;
  private syncHandler: PouchDB.Replication.Sync<{}> | null = null;

  constructor(dbName: string) {
    this.localDB = new PouchDB(dbName);
  }

  setupSync(remoteUrl: string) {
    this.remoteDB = new PouchDB(remoteUrl);
    this.syncHandler = this.localDB.sync(this.remoteDB, {
      live: true,
      retry: true,
    }).on('change', (info) => {
      console.log('Sync change:', info);
      // Best-effort conflict resolution on changed docs
      const docs = (info as any)?.change?.docs || [];
      for (const d of docs) {
        if (d?._id) {
          void this.resolveConflicts(d._id);
        }
      }
    }).on('error', (err) => {
      console.error('Sync error:', err);
    });
  }

  cancelSync() {
    this.syncHandler?.cancel();
    this.syncHandler = null;
    this.remoteDB = null;
  }

  async put(doc: any) {
    return this.localDB.put(doc);
  }

  async get(id: string) {
    return this.localDB.get(id);
  }

  private async resolveConflicts(id: string) {
    try {
      const doc: any = await this.localDB.get(id, { conflicts: true });
      const conflicts: string[] = doc?._conflicts || [];
      if (!conflicts.length) return;

      const candidates: any[] = [doc];
      for (const rev of conflicts) {
        const other = await this.localDB.get(id, { rev });
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
          await this.localDB.put({ _id: id, _rev: c._rev, _deleted: true });
        }
      }
    } catch {
      // ignore conflict resolution failures
    }
  }
}
