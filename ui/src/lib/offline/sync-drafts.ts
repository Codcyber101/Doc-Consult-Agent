import { OfflineSync } from "./sync";

export const draftsSync = new OfflineSync("drafts");

export const syncDrafts = async () => {
  try {
    const remoteUrl = process.env.NEXT_PUBLIC_DRAFTS_REMOTE_URL;
    if (remoteUrl) {
      draftsSync.setupSync(remoteUrl);
      console.log("Drafts sync initialized:", remoteUrl);
    } else {
      console.log("Drafts sync skipped (no NEXT_PUBLIC_DRAFTS_REMOTE_URL).");
    }
  } catch (err) {
    console.error("Failed to sync drafts:", err);
  }
};

