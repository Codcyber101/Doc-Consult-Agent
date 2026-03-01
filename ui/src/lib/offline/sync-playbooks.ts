import { OfflineSync } from './sync';

let playbookSync: OfflineSync | null = null;

const getPlaybookSync = () => {
  if (playbookSync) return playbookSync;
  playbookSync = new OfflineSync('playbooks');
  return playbookSync;
};

export const syncPlaybooks = async () => {
  if (typeof window === 'undefined') return;
  try {
    const remoteUrl = process.env.NEXT_PUBLIC_PLAYBOOKS_REMOTE_URL;
    if (remoteUrl) {
      await getPlaybookSync().setupSync(remoteUrl);
      console.log('Playbook sync initialized:', remoteUrl);
    } else {
      console.log('Playbook sync skipped (no NEXT_PUBLIC_PLAYBOOKS_REMOTE_URL).');
    }
  } catch (err) {
    console.error('Failed to sync playbooks:', err);
  }
};
