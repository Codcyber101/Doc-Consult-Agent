import { OfflineSync } from './sync';

export const playbookSync = new OfflineSync('playbooks');

export const syncPlaybooks = async () => {
  try {
    // In production, use real CouchDB URL from env
    // playbookSync.setupSync('http://localhost:5984/playbooks');
    console.log('Playbook sync initialized');
  } catch (err) {
    console.error('Failed to sync playbooks:', err);
  }
};
