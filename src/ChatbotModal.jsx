// ═══════════════════════════════════════════════════
//  ChatbotModal.jsx
// ═══════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react";
import { C, CloseIcon } from "./constants";
import { D } from "./data";

export default function ChatbotModal({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [answered, setAnswered] = useState([]);
  const bottomRef = useRef(null);

  const { questions, greeting } = D.chatbot;
  const { name, chatGreetImg } = D.profile;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQ = (idx) => {
    if (answered.includes(idx)) return;
    const q = questions[idx];
    setMessages((prev) => [
      ...prev,
      { type: "user", text: q.q.replace(/\n/g, " ") },
      { type: "bot", text: q.a },
    ]);
    setAnswered((prev) => [...prev, idx]);
  };

  const remaining = questions.filter((_, i) => !answered.includes(i));

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 70,
        background: "rgba(0,0,0,0.42)",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#F5F2EC",
          borderRadius: "24px 24px 0 0",
          width: "100%",
          maxHeight: "85%",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.38s cubic-bezier(0.32,0.72,0,1) both",
        }}
      >
        {/* ── 헤더 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 18px",
            background: C.white,
            borderRadius: "24px 24px 0 0",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src="/images/chatbot_online.png"
              alt="Profile"
              style={{
                width: "90%",
                height: "90%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, color: C.charcoal }}>
              {name.split("/")[0].trim()} / Designer
            </div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>
              Online
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#F0EDE6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── 메시지 영역 */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            minHeight: 180,
            wordBreak: "keep-all",
            overflowWrap: "break-word",
          }}
        >
          {/* 그리팅 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              padding: "8px 0 4px",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
            >
              <img
                src={chatGreetImg}
                alt="Sunny"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: C.charcoal,
                textAlign: "center",
                padding: "0 12px",
                lineHeight: 1.55,
              }}
            >
              {greeting}
            </p>
          </div>

          {/* 채팅 말풍선 */}
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.type === "user" ? (
                /* ── 사용자: 오른쪽 — 아바타+레이블 위, 말풍선 아래 */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 6,
                    marginBottom: 8,
                  }}
                >
                  {/* 아바타 + 레이블 */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}
                    >
                      당신
                    </span>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src="/images/chatbot_you.png"
                        alt="You"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                  {/* 말풍선 */}
                  <div
                    style={{
                      maxWidth: "74%",
                      background: "#ECEAE4",
                      color: C.charcoal,
                      borderRadius: "18px 4px 18px 18px",
                      padding: "12px 14px",
                      fontSize: 12,
                      lineHeight: 1.7,
                      textAlign: "right",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ) : (
                /* ── 봇: 왼쪽 — 아바타+레이블 위, 말풍선 아래 */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 6,
                    marginBottom: 8,
                  }}
                >
                  {/* 아바타 + 레이블 */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src="/images/chatbot_memoticon_02.png"
                        alt="Sunny"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <span
                      style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}
                    >
                      선희
                    </span>
                  </div>
                  {/* 말풍선 */}
                  <div
                    style={{
                      maxWidth: "74%",
                      background: C.accent,
                      color: C.white,
                      borderRadius: "4px 18px 18px 18px",
                      padding: "12px 14px",
                      fontSize: 12,
                      lineHeight: 1.7,
                    }}
                  >
                    {Array.isArray(msg.text)
                      ? msg.text.map((para, i) => (
                          <p
                            key={i}
                            style={{
                              margin: 0,
                              marginBottom:
                                i < msg.text.length - 1 ? "10px" : "0",
                            }}
                          >
                            {para}
                          </p>
                        ))
                      : msg.text}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* ── 질문 버튼 */}
        {remaining.length > 0 ? (
          <div
            style={{
              padding: "12px 14px 28px",
              borderTop: `1px solid ${C.border}`,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {remaining.map((q) => {
              const idx = questions.indexOf(q);
              return (
                <button
                  key={idx}
                  onClick={() => handleQ(idx)}
                  style={{
                    width: 334,
                    maxWidth: "100%",
                    margin: "0 auto",
                    padding: "11px 18px",
                    background: C.white,
                    border: "1px solid #E5E7EB",
                    borderRadius: 999,
                    fontSize: 11,
                    color: "#333",
                    lineHeight: 1.45,
                    textAlign: "center",
                    whiteSpace: "pre-line",
                    transition: "background 0.15s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#F8F5F0")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = C.white)
                  }
                >
                  {q.q}
                </button>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              padding: 16,
              textAlign: "center",
              fontSize: 12,
              color: C.muted,
            }}
          >
            ✨ 포트폴리오를 끝까지 살펴봐 주셔서 감사합니다. ✨ <br />✦
            귀사와 함께 성장할 기회를 기다리고 있겠습니다. ✦
          </div>
        )}
      </div>
    </div>
  );
}
