"use client";

import { useState } from "react";

type CopyInviteLinkButtonProps = {
  slug: string;
};

export default function CopyInviteLinkButton({
  slug,
}: CopyInviteLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg border px-3 py-1.5 text-xs font-medium"
    >
      {copied ? "Copied" : "Copy URL"}
    </button>
  );
}