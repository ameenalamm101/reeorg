import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Utility to get a deterministic timestamp for SSR/CSR hydration
function getDeterministicTimestamp() {
  // Use a fixed value for SSR, or Date.now() for client
  if (typeof window === "undefined") {
    // On server, use a fixed value (e.g., build time or env)
    return "2025-01-01T00:00:00.000Z";
  } else {
    // On client, use current time
    return new Date().toISOString();
  }
}

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-2xl rounded-bl-md max-w-xs">
    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full flex-shrink-0">
      <Bot className="w-4 h-4 text-white" />
    </div>
    <div className="flex gap-1">
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  </div>
);

const PREDEFINED_QUESTIONS = [
  "Which functions or roles are falling behind industry trends and post a threat.",
  "Which JDs are outdated, missing, or misaligned—and how is that affecting performance or accountability?",
  "If a market shift or AI breakthrough happened tomorrow, where are we most exposed?",
  "Which teams or roles are most vulnerable to automation—and what’s the immediate upskilling plan?",
];

export default function Chatbot({ userId, userIdentity }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [lastUsage, setLastUsage] = useState(null);
  const [remainingPrompts, setRemainingPrompts] = useState([
    ...PREDEFINED_QUESTIONS,
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      role: "user",
      content: input,
      timestamp: getDeterministicTimestamp(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, userId, userIdentity, token }),
      });
      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            timestamp: getDeterministicTimestamp(),
          },
        ]);
      }
      setSuggestions(data.suggestions || []);
      setLastUsage(data.usage || null);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
          timestamp: getDeterministicTimestamp(),
        },
      ]);
      setLastUsage(null);
    }
    setLoading(false);
  };

  const handlePillClick = async (question) => {
    if (loading) return;

    // Remove the clicked prompt from remainingPrompts
    setRemainingPrompts((prev) => prev.filter((q) => q !== question));
    setInput("");
    setLoading(true);
    const userMsg = {
      role: "user",
      content: question,
      timestamp: getDeterministicTimestamp(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const token = Cookies.get("token");
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          userId,
          userIdentity,
          token,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            timestamp: getDeterministicTimestamp(),
          },
        ]);
      }
      setSuggestions(data.suggestions || []);
      setLastUsage(data.usage || null);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
          timestamp: getDeterministicTimestamp(),
        },
      ]);
      setLastUsage(null);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Main Scrollable Area: includes hello message and pills */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
        {/* Always show hello message at the top */}
        <div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Hello! This is your AI Assistant.
            </h3>
            <p className="text-gray-500 text-sm">
              Got a question? I'm here to help!
            </p>
          </div>
          {remainingPrompts.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center px-4 pt-2 pb-2">
              {remainingPrompts.map((q, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs font-medium transition disabled:opacity-50"
                  onClick={() => handlePillClick(q)}
                  disabled={loading}
                  type="button"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat history */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                msg.role === "user" ? "bg-blue-600" : "bg-gray-100"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-gray-600" />
              )}
            </div>

            <div
              className={`max-w-xs lg:max-w-sm xl:max-w-md px-4 py-3 rounded-2xl ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-gray-100 text-gray-800 rounded-bl-md"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="text-sm leading-relaxed" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold" {...props} />
                      ),
                      code: ({ node, inline, className, children, ...props }) =>
                        inline ? (
                          <code
                            className="bg-gray-200 rounded px-1.5 py-0.5 text-xs font-mono"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-gray-800 text-gray-100 rounded-lg p-3 my-2 overflow-x-auto text-xs">
                            <code {...props}>{children}</code>
                          </pre>
                        ),
                      a: ({ node, ...props }) => (
                        <a
                          className="text-blue-600 underline hover:text-blue-800"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-sm" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc ml-4 my-2 space-y-1"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-3 border-blue-400 pl-3 italic text-gray-600 my-2"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white px-4 py-4">
        <form onSubmit={sendMessage} className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={loading}
              className="pr-12 py-3 rounded-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-full transition-all duration-200 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="border-t bg-gray-50 px-4 py-3 max-h-32 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            Suggestions
          </div>
          <div className="space-y-1">
            {suggestions.map((s, i) => (
              <details key={s.id || i} className="group">
                <summary className="cursor-pointer text-xs text-gray-700 hover:text-gray-900 py-1 list-none">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span>
                      Suggestion {i + 1} (Relevance: {s.relevance.toFixed(2)})
                    </span>
                    <svg
                      className="w-3 h-3 transition-transform group-open:rotate-90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </summary>
                <div className="mt-1 ml-4 text-xs text-gray-600 whitespace-pre-line bg-white rounded p-2 border-l-2 border-blue-200">
                  {s.text}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
