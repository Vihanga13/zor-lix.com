import { useEffect } from "react";

const CHATWOOT_BASE_URL =
  import.meta.env.VITE_CHATWOOT_BASE_URL || "https://app.chatwoot.com";
const CHATWOOT_WEBSITE_TOKEN =
  import.meta.env.VITE_CHATWOOT_WEBSITE_TOKEN || "UXDCvRPA5q71SBYTZCQ7Jx3f";

export default function ChatwootWidget() {
  useEffect(() => {
    const initChatwoot = () => {
      window.chatwootSDK?.run({
        websiteToken: CHATWOOT_WEBSITE_TOKEN,
        baseUrl: CHATWOOT_BASE_URL,
      });
    };

    if (window.chatwootSDK) {
      initChatwoot();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-chatwoot-sdk="true"]'
    );
    if (existing) {
      existing.addEventListener("load", initChatwoot);
      return () => existing.removeEventListener("load", initChatwoot);
    }

    const script = document.createElement("script");
    script.dataset.chatwootSdk = "true";
    script.src = `${CHATWOOT_BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    script.onload = initChatwoot;
    document.body.appendChild(script);
  }, []);

  return null;
}
