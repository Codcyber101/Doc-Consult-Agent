import PouchDB from 'pouchdb-browser';

// Initialize local database for offline persistence only on client side
let localDB: PouchDB.Database | null = null;

const getDB = () => {
  if (!localDB && typeof window !== 'undefined') {
    localDB = new PouchDB('gae_public_portal');
  }
  return localDB;
};

export const saveWizardProgress = async (docId: string, data: any) => {
  const db = getDB();
  if (!db) return;
  
  try {
    let doc;
    try {
      doc = await db.get(docId);
    } catch (err) {
      doc = { _id: docId };
    }
    
    await db.put({
      ...doc,
      ...data,
      updatedAt: new Date().toISOString(),
      syncStatus: 'PENDING'
    });
    
    console.log(`[DB] Progress saved for ${docId}`);
  } catch (error) {
    console.error('[DB] Error saving progress:', error);
  }
};

export const getWizardProgress = async (docId: string) => {
  const db = getDB();
  if (!db) return null;
  
  try {
    return await db.get(docId);
  } catch (err) {
    return null;
  }
};

export default getDB;
