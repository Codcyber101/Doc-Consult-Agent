import { OfflineSync } from "./sync";

let draftsSync: OfflineSync | null = null;

const getDraftsSync = () => {
  if (draftsSync) return draftsSync;
  draftsSync = new OfflineSync("drafts");
  return draftsSync;
};

export const syncDrafts = async () => {
  if (typeof window === "undefined") return;
  try {
    const remoteUrl = process.env.NEXT_PUBLIC_DRAFTS_REMOTE_URL;
    if (remoteUrl) {
      await getDraftsSync().setupSync(remoteUrl);
      console.log("Drafts sync initialized:", remoteUrl);
    } else {
      console.log("Drafts sync skipped (no NEXT_PUBLIC_DRAFTS_REMOTE_URL).");
    }
  } catch (err) {
    console.error("Failed to sync drafts:", err);
  }
};
