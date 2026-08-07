"use client";

import { useState } from "react";

import { MediaPicker } from "@/components/media";

export default function MediaTestPage() {
  const [mediaIds, setMediaIds] = useState<number[]>([]);

  return (
    <div className="space-y-6 p-8">
      <MediaPicker multiple value={mediaIds} onChange={setMediaIds} />

      <pre>{JSON.stringify(mediaIds, null, 2)}</pre>
    </div>
  );
}
