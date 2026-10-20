"use client";

import { useEffect } from "react";
import { trackPhoneClick } from "@/lib/analytics";

export default function InteractionAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (window.location.pathname.startsWith("/private")) return;
      const element = event.target instanceof Element ? event.target : null;
      const link = element?.closest<HTMLAnchorElement>('a[href^="tel:" i]');
      if (!link) return;
      const placement = link.closest("header") ? "header"
        : link.closest("footer") ? "footer"
        : link.closest('[role="dialog"]') ? "mobile_menu" : "page_content";
      trackPhoneClick({ pagePath: window.location.pathname, placement });
    };
    // Delegation also covers phone links in the portalled mobile menu.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
