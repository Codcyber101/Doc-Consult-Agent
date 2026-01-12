import PouchDB from 'pouchdb';

export class OfflineSync {
  private localDB: PouchDB.Database;
  private remoteDB: PouchDB.Database | null = null;

  constructor(dbName: string) {
    this.localDB = new PouchDB(dbName);
  }

  setupSync(remoteUrl: string) {
    this.remoteDB = new PouchDB(remoteUrl);
    this.localDB.sync(this.remoteDB, {
      live: true,
      retry: true,
    }).on('change', (info) => {
      console.log('Sync change:', info);
    }).on('error', (err) => {
      console.error('Sync error:', err);
    });
  }

  async put(doc: any) {
    return this.localDB.put(doc);
  }

  async get(id: string) {
    return this.localDB.get(id);
  }
}
