// ═══════════════════════════════════════════════════
//  constants.js  — 색상 토큰, 아이콘, 공유 컴포넌트
// ═══════════════════════════════════════════════════
import { useEffect, useState } from "react";

/* ── 색상 */
export const C = {
  accent: "#E8471C",
  charcoal: "#1A1A1A",
  muted: "#9CA3AF",
  bg: "#F2EFE8",
  bgOuter: "#E8E4DC",
  border: "#DDD9D1",
  white: "#FFFFFF",
  teal: "#4EC9B0",
};

/* ── GlobalStyles (폰트 임포트) */
export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Arbutus&family=Noto+Sans+KR:wght@400;700;900&display=swap');

    @font-face {
      font-family: 'Ycomputer';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/Ycomputer-Regular.woff2') format('woff2');
      font-weight: normal; font-style: normal;
    }

    * {
      font-family: 'Noto Sans KR', sans-serif;
      box-sizing: border-box; margin: 0; padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .f-arbutus   { font-family: 'Arbutus', serif !important; }
    .f-ycomputer { font-family: 'Ycomputer', monospace !important; }

    ::-webkit-scrollbar { display: none; }
    * { scrollbar-width: none; }

    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes barReveal{ from{clip-path:inset(0 100% 0 0);opacity:0} to{clip-path:inset(0 0% 0 0);opacity:1} }
    @keyframes slideUp  { from{transform:translateY(100%)} to{transform:translateY(0)} }

    .anim-fi  { animation: fadeIn    0.7s ease both; }
    .anim-fiu { animation: fadeInUp  0.7s ease both; }
    .anim-bar { animation: barReveal 1.3s cubic-bezier(0.22,1,0.36,1) both; }

    button { border:none; background:none; cursor:pointer; padding:0; }
  `}</style>
);

/* ── StatusBar */
export function StatusBar() {
  const ic = C.accent;
  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "0 22px 6px",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 15, color: ic }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={ic}>
          <rect x="0" y="8" width="3" height="4" rx="0.6" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.6" />
          <rect x="9" y="2" width="3" height="10" rx="0.6" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.6" opacity="0.35" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="10.5" r="1.3" fill={ic} />
          <path
            d="M5 8c.8-.8 1.9-1.3 3-1.3s2.2.5 3 1.3"
            stroke={ic}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M2.5 5.5C4 3.9 5.9 3 8 3s4 .9 5.5 2.5"
            stroke={ic}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12">
          <rect
            x="0"
            y="1.5"
            width="22"
            height="9"
            rx="2.5"
            stroke={ic}
            strokeWidth="1.3"
            fill="none"
          />
          <rect x="1.2" y="2.7" width="16" height="6.6" rx="1.5" fill={ic} />
          <rect
            x="23"
            y="4"
            width="2"
            height="4"
            rx="1"
            fill={ic}
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── SVG Icons */
export const CloseIcon = () => (
  <svg
    viewBox="0 0 14 14"
    width="14"
    height="14"
    fill="none"
    stroke="#6B7280"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="2" y1="2" x2="12" y2="12" />
    <line x1="12" y1="2" x2="2" y2="12" />
  </svg>
);

export const ChatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

export const ChevronIcon = () => (
  <svg
    viewBox="0 0 14 14"
    width="16"
    height="16"
    fill="none"
    stroke={C.muted}
    strokeWidth="2"
    strokeLinecap="round"
  >
    <polyline points="3,5 7,9 11,5" />
  </svg>
);

export const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

/* ── SkillBar */
export function SkillBar({ skill, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(skill.pct), 300 + delay);
    return () => clearTimeout(t);
  }, [skill.pct, delay]);

  return (
    <div
      style={{
        width: 310,
        margin: "0 auto",
        background: C.white,
        borderRadius: 14,
        padding: "13px 16px 12px",
        border: `1px solid ${C.border}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 7,
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            maxWidth: "72%",
          }}
        >
          {skill.name}
        </span>
        <span
          style={{
            fontWeight: 900,
            fontSize: 16,
            color: "#FF5031",
            letterSpacing: "-0.04em",
            flexShrink: 0,
          }}
        >
          {skill.pct}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 99,
          background: "#EDEBE5",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 99,
            background: "#FF5031",
            width: `${w}%`,
            transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        />
      </div>
      <div
        style={{
          fontSize: 10,
          color: "#6B7280",
          fontWeight: 400,
          lineHeight: 1.4,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {skill.sub}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "#9CA3AF",
          fontWeight: 400,
          lineHeight: 1.45,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {skill.detail}
      </div>
    </div>
  );
}

/* ── Chart */
export function Chart({ bars }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 250);
    return () => clearTimeout(t);
  }, []);
  const H = 100,
    W = 240,
    pad = 28;
  const step = (W - pad * 2) / (bars.length - 1);
  const pts = bars
    .map((b, i) => `${pad + i * step},${H - (b.teal / 100) * H}`)
    .join(" ");

  return (
    <div
      style={{
        borderRadius: 18,
        padding: "14px",
        background: "#ECEAE4",
        border: "1px solid #E0DDD5",
        marginBottom: 12,
      }}
    >
      <div style={{ position: "relative", height: 118 }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
          preserveAspectRatio="none"
        >
          {[0, 25, 50, 75, 100].map((v) => (
            <line
              key={v}
              x1="0"
              y1={H - v}
              x2={W}
              y2={H - v}
              stroke="#D8D4CC"
              strokeWidth="0.5"
            />
          ))}
          {bars.map((b, i) => {
            const bw = 15,
              x = pad + i * step - bw / 2,
              bh = (b.orange / 100) * H;
            return (
              <rect
                key={`o${i}`}
                x={x}
                y={H - (on ? bh : 0)}
                width={bw}
                height={on ? bh : 0}
                rx="2"
                fill={C.accent}
                opacity="0.85"
                style={{
                  transition: `all 0.85s cubic-bezier(0.22,1,0.36,1) ${
                    i * 80
                  }ms`,
                }}
              />
            );
          })}
          {bars.map((b, i) => {
            const bw = 15,
              x = pad + i * step + 2,
              bh = (b.teal / 100) * H;
            return (
              <rect
                key={`t${i}`}
                x={x}
                y={H - (on ? bh : 0)}
                width={bw}
                height={on ? bh : 0}
                rx="2"
                fill={C.teal}
                opacity="0.85"
                style={{
                  transition: `all 0.85s cubic-bezier(0.22,1,0.36,1) ${
                    i * 80 + 100
                  }ms`,
                }}
              />
            );
          })}
          <polyline
            points={pts}
            fill="none"
            stroke={C.accent}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: on ? 1 : 0,
              transition: "opacity 0.6s ease 0.75s",
            }}
          />
          {bars.map((b, i) => (
            <circle
              key={`c${i}`}
              cx={pad + i * step}
              cy={H - (b.teal / 100) * H}
              r="3"
              fill={C.accent}
              style={{
                opacity: on ? 1 : 0,
                transition: `opacity 0.3s ease ${0.95 + i * 0.06}s`,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ── BottomNav */
const NAV = [
  { id: "home", src: "/images/home.png", alt: "Home" },
  { id: "stats", src: "/images/dashboard.png", alt: "Stats" },
  { id: "portfolio", src: "/images/portfolio.png", alt: "Portfolio" },
  { id: "alerts", src: "/images/alerts.png", alt: "Alerts" },
  { id: "mypage", src: "/images/mypage.png", alt: "My Page" },
];

export function BottomNav({ active, onSwitch }) {
  return (
    <div
      style={{
        flexShrink: 0,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 8px",
        background: "rgba(242,239,232,0.97)",
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      {NAV.map((t) => {
        const isActive = active === t.id;
        const showBadge = t.id === "alerts" && active !== "alerts";

        return (
          <button
            key={t.id}
            onClick={() => onSwitch(t.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 12,
              position: "relative",
              transition: "transform 0.15s ease",
              flexShrink: 0,
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.88)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={t.src}
              alt={t.alt}
              style={{
                width: 24,
                height: 24,
                objectFit: "contain",
                display: "block",
                filter: isActive
                  ? "invert(35%) sepia(98%) saturate(800%) hue-rotate(345deg) brightness(95%) contrast(105%)"
                  : "invert(65%) sepia(0%) saturate(0%) brightness(80%)",
                transition: "filter 0.2s ease",
              }}
            />
            {showBadge && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  minWidth: 10,
                  height: 10,
                  borderRadius: 99,
                  background: "#FF5031",
                  border: "1.5px solid rgba(242,239,232,0.97)",
                }}
              ></div>
            )}
          </button>
        );
      })}
    </div>
  );
}
