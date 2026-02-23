"use client";

import React from "react";
import { syncPlaybooks } from "@/lib/offline/sync-playbooks";
import { syncDrafts } from "@/lib/offline/sync-drafts";

export function OfflineSyncInitializer() {
  React.useEffect(() => {
    void syncPlaybooks();
    void syncDrafts();
  }, []);

  return null;
}

