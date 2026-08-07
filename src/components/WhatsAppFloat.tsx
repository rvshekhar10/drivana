"use client";

import ChatWidget from "./ChatWidget";

/**
 * Previously a simple WhatsApp link button.
 * Now renders the full AI chatbot widget (with WhatsApp fallback link inside).
 */
export default function WhatsAppFloat() {
  return <ChatWidget />;
}
