"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tracks every click on the page and sends it to Google Analytics.
 * Captures: element tag, text content, href (if link), id, class, and data attributes.
 */
export default function ClickTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!window.gtag) return;

      const target = e.target as HTMLElement;
      const closestLink = target.closest("a");
      const closestButton = target.closest("button");
      const element = closestLink || closestButton || target;

      // Build a descriptive label
      const text = element.textContent?.trim().slice(0, 50) || "";
      const tagName = element.tagName.toLowerCase();
      const id = element.id || undefined;
      const href = closestLink?.getAttribute("href") || undefined;
      const className = element.className
        ? String(element.className).slice(0, 100)
        : undefined;

      // Get data attributes for more context
      const dataAttrs: Record<string, string> = {};
      if (element.dataset) {
        Object.entries(element.dataset).forEach(([key, value]) => {
          if (value) dataAttrs[`data_${key}`] = value.slice(0, 50);
        });
      }

      window.gtag("event", "click", {
        event_category: "engagement",
        event_label: text || tagName,
        element_tag: tagName,
        element_id: id,
        element_text: text,
        link_url: href,
        element_class: className,
        ...dataAttrs,
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
