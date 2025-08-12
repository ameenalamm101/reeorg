import React, { useState } from "react";
import { Bot, X, Minus, MessageCircle } from "lucide-react";
import Chatbot from "./Chatbot";

export default function ChatbotBubble({ navbarHeight = 72 }) {
  const [open, setOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Panel config
  const panelWidth = 370; // px
  const panelMarginRight = 32; // px
  const panelMarginBottom = 32; // px
  const borderRadius = 24; // px
  const topOffset = navbarHeight; // px

  // Handler for minimize (just close panel)
  const handleMinimize = () => setOpen(false);

  // Handler for close (reset chat, then close panel)
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setResetKey((k) => k + 1), 400); // Wait for animation, then reset
  };

  // Handler for open (resetKey is not changed here: only reset when closing)
  const handleOpen = () => setOpen(true);

  return (
    <>
      {/* Chatbot Side Panel: always mounted, just hidden when closed */}
      <div
        className={`
          chatbot-panel
          fixed
          z-50
          shadow-2xl
          border border-gray-200
          bg-white
          flex flex-col
          transition-all duration-400 ease-in-out
          ${open ? "animate-chatbot-open" : ""}
        `}
        style={{
          width: panelWidth,
          right: panelMarginRight,
          bottom: panelMarginBottom,
          top: topOffset,
          borderRadius: borderRadius,
          boxSizing: "border-box",
          padding: 0,
          overflow: "hidden",
          position: "fixed",
          display: open ? "flex" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-white font-semibold text-lg">
                AI Assistant
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white/80 text-xs">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Minimize Button */}
            <button
              onClick={handleMinimize}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all duration-200"
              aria-label="Minimize"
              style={{ marginRight: 2 }}
            >
              <Minus className="w-5 h-5" />
            </button>
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all duration-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chatbot Content */}
        <div style={{ flex: 1, overflow: "hidden", padding: "1.2rem" }}>
          {/* Resetting key remounts Chatbot, resetting its state */}
          <Chatbot key={resetKey} userId="demo-user" userIdentity="Demo User" />
        </div>
      </div>

      {/* Floating Bubble (only when closed) */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-8 right-8 group flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 transform hover:scale-105 z-50"
          style={{ minWidth: 60 }}
          aria-label="Open chatbot"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <span className="hidden sm:inline text-base font-medium">
            AI Assistant
          </span>
        </button>
      )}

      {/* Styles for animation and responsive centering */}
      <style>{`
        @keyframes chatbotOpen {
          0% { transform: translateY(24px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-chatbot-open {
          animation: chatbotOpen 0.3s cubic-bezier(.4,2,.6,1);
        }
        @media (max-width: 640px) {
          .chatbot-panel {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            width: 90% !important;
            max-width: 370px;
          }
        }
      `}</style>
    </>
  );
}
