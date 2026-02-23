import { OfflineSync } from './sync';

export const playbookSync = new OfflineSync('playbooks');

export const syncPlaybooks = async () => {
  try {
    const remoteUrl = process.env.NEXT_PUBLIC_PLAYBOOKS_REMOTE_URL;
    if (remoteUrl) {
      playbookSync.setupSync(remoteUrl);
      console.log('Playbook sync initialized:', remoteUrl);
    } else {
      console.log('Playbook sync skipped (no NEXT_PUBLIC_PLAYBOOKS_REMOTE_URL).');
    }
  } catch (err) {
    console.error('Failed to sync playbooks:', err);
  }
};
