// ═══════════════════════════════════════════════════
//  Tabs.jsx  — SplashScreen + 5개 탭 컴포넌트
// ═══════════════════════════════════════════════════
import { useState, useEffect } from "react";
import {
  C,
  StatusBar,
  SkillBar,
  Chart,
  ChevronIcon,
  ChatIcon,
} from "./constants";
import { D } from "./data";
import ProjectModal from "./ProjectModal";
import ChatbotModal from "./ChatbotModal";

/* ── 바코드 SVG */
const Barcode = () => (
  <svg
    viewBox="0 0 320 48"
    preserveAspectRatio="none"
    style={{ width: "100%", height: 46, display: "block" }}
  >
    {[
      2, 4, 7, 9, 12, 15, 17, 20, 23, 25, 28, 31, 33, 36, 39, 41, 44, 47, 49,
      52, 55, 57, 60, 63, 65, 68, 71, 73, 76, 79, 81, 84, 87, 89, 92, 95, 97,
      100, 103, 105, 108, 111, 113, 116, 119, 121, 124, 127, 129, 132, 135, 137,
      140, 143, 145, 148, 151, 153, 156, 159, 161, 164, 167, 169, 172, 175, 177,
      180, 183, 185, 188, 191, 193, 196, 199, 201, 204, 207, 209, 212, 215, 217,
      220, 223, 225, 228, 231, 233, 236, 239, 241, 244, 247, 249, 252, 255, 257,
      260, 263, 265, 268, 271, 273, 276, 279, 281, 284, 287, 289, 292, 295, 297,
      300, 303, 305, 308, 311, 313, 316, 319,
    ].map((x, i) => (
      <rect
        key={i}
        x={x}
        y="0"
        width={i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1}
        height="48"
        fill={C.charcoal}
      />
    ))}
  </svg>
);

/* ─────────────────────────────────────────────────
   SPLASH SCREEN  (5초 자동 전환)
───────────────────────────────────────────────── */
export function SplashScreen({ onStart }) {
  useEffect(() => {
    const t = setTimeout(onStart, 6000);
    return () => clearTimeout(t);
  }, [onStart]);

  const { brand } = D;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#E8E4DC",
      }}
    >
      <StatusBar />

      {/* 로고 중앙 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={brand.logoImg}
          alt="DesignLab Logo"
          style={{
            width: 80,
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>

      {/* 하단 5개 요소 */}
      <div
        style={{
          padding: "0 22px 34px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* ① Crafting Brand Experience — Arbutus, 배경 없음, 오렌지 텍스트 */}
        <p
          className="f-arbutus"
          style={{
            color: "#FF5031",
            fontSize: 17,
            textAlign: "center",
            marginBottom: 13,
            background: "none",
            lineHeight: 1.3,
          }}
        >
          {brand.tagline}
        </p>

        {/* ② 비즈니스를 완성하는 여정 — Ycomputer, 오렌지 박스 */}
        <div
          className="f-ycomputer"
          style={{
            width: 214,
            height: 37,
            background: "#FF5031",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            flexShrink: 0,
            color: "#fff",
            fontSize: 13,
            letterSpacing: "0.04em",
          }}
        >
          {brand.subTagline}
        </div>

        {/* ③ 바코드 — /images/barcode.png */}
        <img
          src="/images/barcode.png"
          alt="barcode"
          style={{
            width: 214,
            height: "auto",
            display: "block",
            marginBottom: 20,
          }}
        />

        {/* ④ Start Journey */}
        <button
          className="f-arbutus"
          onClick={onStart}
          style={{
            width: 219,
            height: 36,
            background: "#FF5031",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            letterSpacing: "0.06em",
            flexShrink: 0,
            transition: "transform 0.15s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Start Journey
        </button>

        {/* ⑤ Copyright */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <div
            style={{
              fontWeight: 900,
              fontSize: 11,
              color: C.charcoal,
              letterSpacing: 2,
            }}
          >
            {brand.copyright}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#888",
              letterSpacing: 1,
              marginTop: 3,
            }}
          >
            {brand.author}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   TAB: DASHBOARD
───────────────────────────────────────────────── */
export function DashboardTab() {
  const [filter, setFilter] = useState("BX");
  const shown =
    filter === "BX"
      ? D.dashboard.skills
      : D.dashboard.skills.filter((s) => s.cat === filter);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <StatusBar />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ paddingTop: 56, paddingBottom: 100 }}>
          {/* 타이틀 영역 — pl:22px */}
          <div style={{ paddingLeft: 22, paddingRight: 22, marginBottom: 20 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: C.accent,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              DASHBOARD
            </div>
            <div
              style={{
                fontSize: 17,
                lineHeight: "20px",
                letterSpacing: "-0.28px",
                fontWeight: 900,
                color: "#000",
                marginBottom: 2,
              }}
            >
              {D.dashboard.title}
            </div>
            <div
              style={{
                fontSize: 15,
                lineHeight: "20px",
                letterSpacing: "-0.28px",
                fontWeight: 500,
                color: "#000",
                marginBottom: 10,
              }}
            >
              {D.dashboard.subtitle}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#6B7280",
                lineHeight: 1.85,
                fontWeight: 400,
                whiteSpace: "pre-line",
              }}
            >
              {D.dashboard.desc}
            </div>
          </div>

          {/* 차트·필터·카드 — w:335 mx-auto */}
          <div style={{ width: 310, margin: "0 auto" }}>
            <Chart bars={D.dashboard.chartBars} />
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 14,
                overflowX: "auto",
                paddingBottom: 2,
              }}
            >
              {D.dashboard.filterTabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  style={{
                    flexShrink: 0,
                    padding: "5px 12px",
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 600,
                    transition: "all 0.18s ease",
                    background: filter === t ? C.charcoal : C.white,
                    color: filter === t ? C.white : "#555",
                    border: `1px solid ${filter === t ? C.charcoal : "#DDD"}`,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(shown.length ? shown : D.dashboard.skills).map((s, i) => (
                <SkillBar key={s.name} skill={s} delay={i * 120} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   TAB: PORTFOLIO  (8개 카드)
───────────────────────────────────────────────── */
export function PortfolioTab() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <StatusBar />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ paddingTop: 56, paddingBottom: 100 }}>
          {/* 타이틀 — pl:22px */}
          <div style={{ paddingLeft: 22, paddingRight: 22, marginBottom: 20 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: C.accent,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              PROJECTS
            </div>
            <div
              style={{
                fontSize: 17,
                lineHeight: "20px",
                letterSpacing: "-0.28px",
                fontWeight: 900,
                color: "#000",
                marginBottom: 2,
              }}
            >
              Portfolio Gallery
            </div>
            <div
              style={{
                fontSize: 15,
                lineHeight: "20px",
                letterSpacing: "-0.28px",
                fontWeight: 500,
                color: "#000",
                marginBottom: 10,
              }}
            >
              : 시각적 언어의 기록
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#6B7280",
                lineHeight: 1.85,
                fontWeight: 400,
              }}
            >
              비즈니스를 완성하는 디자인
            </div>
          </div>

          {/* 그리드 — w:335 mx-auto */}
          <div style={{ width: 310, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {D.projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  style={{
                    textAlign: "left",
                    background: C.white,
                    borderRadius: 16,
                    overflow: "hidden",
                    border: `1px solid ${C.border}`,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.96)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {/* 썸네일 */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "3/2",
                      background: p.bg,
                      overflow: "hidden",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={p.thumbnail || p.img}
                      alt={p.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    {p.isVideo && (
                      <div
                        style={{
                          position: "relative",
                          zIndex: 2,
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.3)",
                          backdropFilter: "blur(4px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        }}
                      >
                        <svg
                          width="12"
                          height="14"
                          viewBox="0 0 12 14"
                          fill="white"
                        >
                          <polygon points="0,0 12,7 0,14" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* 카드 텍스트 */}
                  <div style={{ padding: "9px 11px 11px" }}>
                    <div
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        color: C.accent,
                        letterSpacing: 1.6,
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      {p.cat}
                    </div>
                    <div style={{ fontSize: 10, color: "#6B7280" }}>
                      {p.genre}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.charcoal,
                        marginTop: 2,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   TAB: TIMELINE (아코디언)
───────────────────────────────────────────────── */
export function TimelineTab() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const DOT_SIZE = 8;
  const DOT_TOP = 22;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <StatusBar />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ paddingTop: 56, paddingBottom: 100 }}>
          {/* 타이틀 — pl:22px */}
          <div style={{ paddingLeft: 22, paddingRight: 22, marginBottom: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.accent,
                    letterSpacing: 4,
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  TIMELINE
                </div>
                <div
                  style={{
                    fontSize: 17,
                    lineHeight: "20px",
                    letterSpacing: "-0.28px",
                    fontWeight: 900,
                    color: "#000",
                    marginBottom: 2,
                  }}
                >
                  Career Story
                </div>
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: "20px",
                    letterSpacing: "-0.28px",
                    fontWeight: 500,
                    color: "#000",
                    marginBottom: 10,
                  }}
                >
                  : 경력 히스토리
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#6B7280",
                    lineHeight: 1.85,
                    fontWeight: 400,
                  }}
                >
                  과거의 경험이 모여 현재의 비즈니스 가치가 됩니다.
                </div>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.accent,
                  background: "rgba(232,71,28,0.08)",
                  border: "1px solid rgba(232,71,28,0.18)",
                  padding: "4px 10px",
                  borderRadius: 99,
                  marginTop: 4,
                  flexShrink: 0,
                }}
              >
                {D.timeline.length}
              </span>
            </div>
          </div>

          {/* 타임라인 — w:335 mx-auto */}
          <div style={{ width: 310, margin: "0 auto" }}>
            <div style={{ position: "relative", paddingLeft: 24 }}>
              {/* 수직 라인 */}
              <div
                style={{
                  position: "absolute",
                  left: 7,
                  top: 10,
                  bottom: 0,
                  width: 1.5,
                  background: `linear-gradient(to bottom,${C.accent} 0%,rgba(232,71,28,0.15) 100%)`,
                }}
              />

              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {D.timeline.map((item) => (
                  <div key={item.id} style={{ position: "relative" }}>
                    {/* 닷 */}
                    <div
                      style={{
                        position: "absolute",
                        left: -20,
                        top: 45,
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        borderRadius: "50%",
                        zIndex: 1,
                        background: item.dot
                          ? C.accent
                          : openId === item.id
                          ? C.charcoal
                          : "#E8E4DC",
                        border: `2px solid ${
                          item.dot
                            ? C.accent
                            : openId === item.id
                            ? C.charcoal
                            : "#C8C4BA"
                        }`,
                        transition:
                          "background 0.2s ease, border-color 0.2s ease",
                      }}
                    />

                    {/* 카드 */}
                    <div
                      style={{
                        background: C.white,
                        borderRadius: 16,
                        border: `1px solid ${C.border}`,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => toggle(item.id)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "16px 14px",
                          background: "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 4,
                                gap: 6,
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                  fontSize: 13,
                                  color: C.charcoal,
                                  letterSpacing: "-0.02em",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                | {item.role}
                              </span>
                              <span
                                style={{
                                  fontSize: 10,
                                  color: C.muted,
                                  fontWeight: 500,
                                  flexShrink: 0,
                                }}
                              >
                                {item.type}
                              </span>
                            </div>
                            {/* 회사명 — fontSize:8 (본문 -3px) */}
                            <div
                              style={{
                                fontSize: 8,
                                color: "#6B7280",
                                lineHeight: 1.5,
                                marginBottom: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.company}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: C.muted,
                                lineHeight: 1.4,
                              }}
                            >
                              {item.loc}
                              {item.dur ? ` | ${item.dur}` : ""} | {item.period}
                            </div>
                          </div>
                          <span
                            style={{
                              display: "inline-flex",
                              marginTop: 2,
                              flexShrink: 0,
                              transform:
                                openId === item.id
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          >
                            <ChevronIcon />
                          </span>
                        </div>
                      </button>

                      {/* 아코디언 바디 */}
                      <div
                        style={{
                          maxHeight: openId === item.id ? 420 : 0,
                          overflow: "hidden",
                          transition:
                            "max-height 0.45s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >
                        <div
                          style={{
                            padding: "14px 14px 16px",
                            borderTop: "1px solid #F0EDE6",
                          }}
                        >
                          <p
                            style={{
                              fontSize: 12,
                              color: "#555",
                              lineHeight: 1.85,
                              marginBottom: 12,
                            }}
                          >
                            {item.detail}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 6,
                            }}
                          >
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                style={{
                                  fontSize: 10,
                                  fontWeight: 600,
                                  color: C.accent,
                                  background: "rgba(232,71,28,0.07)",
                                  border: "1px solid rgba(232,71,28,0.15)",
                                  padding: "3px 9px",
                                  borderRadius: 8,
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   TAB: MY PAGE
───────────────────────────────────────────────── */
export function MyPageTab() {
  const [chatOpen, setChatOpen] = useState(false);
  const { profile } = D;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
      }}
    >
      <StatusBar />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/*
          피그마 절대 수치:
          컨테이너: w-[334px] mx-auto, position:relative, minHeight:800
          소개 카드:        top:65  h:380
          언어 카드:        top:454 h:91
          주요 능력 카드:   top:554 h:91
          디자인 철학 카드: top:653 h:91
          피그마 링크 카드: top:758 h:80
        */}
        <div
          style={{
            width: 310,
            margin: "0 auto",
            position: "relative",
            minHeight: 900,
            paddingBottom: 120,
          }}
        >
          {/* ── 소개 카드 (오렌지 히어로) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 65,
              width: 310,
              height: 380,
              borderRadius: 18,
              background: C.accent,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 30,
              trasform: "translateZ(0)",
              WebkitMaskImage: "-webkit-radial-gradient(white, black)",
            }}
          >
            <img
              src="/images/mypage_memoticon.png"
              alt="Profile"
              style={{
                width: "auto",
                height: 180,
                objectFit: "contain",
                marginBottom: 12,
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: C.white,
                letterSpacing: "-0.05em",
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.72)",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              {profile.role}
            </div>
            <div style={{ display: "flex" }}>
              {profile.stats.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ textAlign: "center", padding: "0 18px" }}>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 900,
                        color: C.white,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.55)",
                        marginTop: 2,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                  {i < profile.stats.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        background: "rgba(255,255,255,0.2)",
                        height: 32,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── 언어 카드 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 454,
              width: 310,
              height: 91,
              borderRadius: 16,
              background: "#DDDED5",
              border: `1px solid ${C.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 12,
                color: "rgba(0, 0, 0, 10)",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Language &amp; Communication
            </div>
            <div
              style={{
                fontWeight: 500,
                color: "rgba(0, 0, 0, 10)",
                letterSpacing: 5,
                fontSize: 10,
              }}
            >
              {profile.languages}
            </div>
          </div>

          {/* ── 주요 능력 카드 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 554,
              width: 310,
              height: 91,
              borderRadius: 16,
              background: "#B1B2AC",
              border: `1px solid ${C.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 12,
                color: "#555",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Key Expertise
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                alignItems: "center",
              }}
            >
              {profile.expertise.map((e) => (
                <div
                  key={e}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#444",
                    letterSpacing: 1,
                  }}
                >
                  · {e}
                </div>
              ))}
            </div>
          </div>

          {/* ── 디자인 철학 카드 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 653,
              width: 310,
              height: 91,
              borderRadius: 16,
              background: "#3D3D3D",
              border: `1px solid ${C.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 12,
                color: "#84857D",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Design Philosophy
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: 500,
                  color: "#84857D",
                  letterSpacing: 1.5,
                  fontSize: 12,
                }}
              >
                {profile.philosophy.title}
              </div>
              <div
                style={{
                  fontWeight: 400,
                  color: "#84857D",
                  letterSpacing: 2,
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {profile.philosophy.subtitle}
              </div>
            </div>
          </div>

          {/* ── 피그마 링크 카드 */}
          <a
            href="https://www.figma.com/proto/zRlcgGRqIYdhAWYsgRZN6R/DesignLab?node-id=3203-948&p=f&viewport=-775%2C-310%2C0.39&t=rvGAsCtiGoeyO5pa-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3203%3A948&show-proto-sidebar=1&page-id=0%3A1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              left: 0,
              top: 752,
              width: 310,
              height: 80,
              borderRadius: 16,
              background: "#3B212C",
              border: "1px solid rgba(255,80,49,0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(255,80,49,0.12)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.97)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(255,80,49,0.18)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(255,80,49,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(255,80,49,0.12)";
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 12,
                color: "#F43322",
                letterSpacing: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              이 프로젝트의 UXUI 설계 과정 보기 🔗
            </div>
            <div
              style={{
                fontWeight: 400,
                fontSize: 10,
                color: "#F43322",
                letterSpacing: 0.5,
                textAlign: "center",
              }}
            >
              기획부터 프로토타입까지 한눈에 확인하실 수 있습니다.
            </div>
          </a>
        </div>
      </div>

      {/* 플로팅 챗봇 버튼 */}
      <button
        onClick={() => setChatOpen(true)}
        style={{
          position: "absolute",
          right: 22,
          bottom: 15,
          zIndex: 40,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: C.accent,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 8px 28px rgba(232,71,28,0.4)`,
          transition: "transform 0.15s ease",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src={profile.chatImg}
          alt="Chat"
          style={{ width: 48, height: 48, objectFit: "contain" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </button>

      {chatOpen && <ChatbotModal onClose={() => setChatOpen(false)} />}
    </div>
  );
}
