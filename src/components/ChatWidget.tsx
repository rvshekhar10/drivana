"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = "drivana_chat_session";
const WHATSAPP_NUMBER = "919205548488";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { sessionId: sid } = JSON.parse(stored);
        if (sid) setSessionId(sid);
      } catch {
        // Invalid stored data
      }
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasUnread(false);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text.trim(),
            sessionId,
          }),
        });

        const data = await res.json();

        if (data.success && data.data) {
          const reply = data.data;

          // Save session ID
          if (reply.sessionId && reply.sessionId !== sessionId) {
            setSessionId(reply.sessionId);
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ sessionId: reply.sessionId })
            );
          }

          const assistantMsg: ChatMessage = {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content: reply.response || reply.message || "I'm here to help!",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, assistantMsg]);

          if (!isOpen) setHasUnread(true);
        } else {
          // API error — show fallback
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-err-${Date.now()}`,
              role: "assistant",
              content:
                "Sorry, I'm having trouble connecting. You can reach us on WhatsApp for immediate help!",
              timestamp: new Date(),
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-err-${Date.now()}`,
            role: "assistant",
            content:
              "Connection issue. Please try again or chat with us on WhatsApp.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, sessionId, isOpen]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const quickActions = [
    "What cars are available?",
    "Pricing & discounts",
    "How to book?",
    "Documents required",
  ];

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    DRIVANA AI
                  </p>
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20need%20help%20with%20a%20booking.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Switch to WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <ExternalLink size={14} className="text-white/40" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={16} className="text-white/40" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-gold" />
                    </div>
                    <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                      <p className="text-sm text-white/80 leading-relaxed">
                        Hi! I&apos;m DRIVANA&apos;s AI assistant. I can help you with car availability, pricing, booking process, and more. How can I help?
                      </p>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="pl-9 flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => sendMessage(action)}
                        className="text-xs text-gold/80 bg-gold/5 border border-gold/20 hover:border-gold/40 hover:bg-gold/10 px-3 py-1.5 rounded-full transition-all"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-gold" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 ${
                      msg.role === "user"
                        ? "bg-gold/20 border border-gold/30 rounded-tr-sm"
                        : "bg-white/[0.04] border border-white/[0.06] rounded-tl-sm"
                    }`}
                  >
                    <p
                      className={`text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "text-white"
                          : "text-white/80"
                      }`}
                    >
                      {msg.content}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} className="text-white/60" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-gold" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about our cars..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gold hover:bg-gold-light disabled:opacity-30 disabled:cursor-not-allowed text-black transition-all"
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-white/20 text-center mt-2">
                AI-powered • Also available on{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500/50 hover:text-green-500/80"
                >
                  WhatsApp
                </a>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, ease: "backOut" }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(206,150,61,0.3)] hover:shadow-[0_4px_30px_rgba(206,150,61,0.5)] transition-all duration-200 hover:scale-110 ${
          isOpen
            ? "bg-white/10 border border-white/20"
            : "bg-gold hover:bg-gold-light"
        }`}
        aria-label={isOpen ? "Close chat" : "Open AI chat assistant"}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <>
            <MessageCircle size={26} className="text-black" />
            {/* Unread badge */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[9px] text-white font-bold">!</span>
              </span>
            )}
            {/* Pulse */}
            <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
          </>
        )}
      </motion.button>
    </>
  );
}
