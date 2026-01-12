import PouchDB from 'pouchdb';

// Initialize local database for offline persistence
const localDB = new PouchDB('gae_public_portal');

export const saveWizardProgress = async (docId: string, data: any) => {
  try {
    let doc;
    try {
      doc = await localDB.get(docId);
    } catch (err) {
      doc = { _id: docId };
    }
    
    await localDB.put({
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
  try {
    return await localDB.get(docId);
  } catch (err) {
    return null;
  }
};

export default localDB;
