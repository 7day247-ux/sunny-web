// ═══════════════════════════════════════════════════
//  App.jsx  — 메인 앱 엔트리 포인트
//             iPhone 프레임 + 탭 라우팅
// ═══════════════════════════════════════════════════
import { useState } from "react";
import { GlobalStyles, BottomNav, C } from "./constants";
import {
  SplashScreen,
  DashboardTab,
  PortfolioTab,
  TimelineTab,
  MyPageTab,
} from "./Tabs";

/* ── 다이내믹 아일랜드 */
const DynamicIsland = () => (
  <div
    style={{
      position: "absolute",
      top: 12,
      left: "50%",
      transform: "translateX(-50%)",
      width: 120,
      height: 36,
      background: "#0D0D0D",
      borderRadius: 20,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    }}
  >
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#1A1A1A",
        border: "2px solid #2A2A2A",
      }}
    />
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#1E3A5F",
        opacity: 0.65,
      }}
    />
  </div>
);

/* ── iPhone 사이드 버튼 */
const SideButtons = () => (
  <>
    {[130, 184, 236].map((top) => (
      <div
        key={top}
        style={{
          position: "absolute",
          left: 0,
          top,
          width: 3,
          height: 36,
          background: "#2A2A2A",
          borderRadius: "2px 0 0 2px",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 180,
        width: 3,
        height: 72,
        background: "#2A2A2A",
        borderRadius: "0 2px 2px 0",
      }}
    />
  </>
);

/* ── 그레인 오버레이 */
const GrainOverlay = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 9999,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
    }}
  />
);

/* ── 탭 패널 목록 */
const TABS = [
  { id: "stats", Tab: DashboardTab },
  { id: "portfolio", Tab: PortfolioTab },
  { id: "alerts", Tab: TimelineTab },
  { id: "mypage", Tab: MyPageTab },
];

/* ════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════ */
export default function App() {
  const [phase, setPhase] = useState("splash"); // "splash" | "app"
  const [activeTab, setActiveTab] = useState("stats");

  const goToApp = () => {
    setPhase("app");
    setActiveTab("stats");
  };

  const handleTab = (id) => {
    if (id === "home") {
      setPhase("splash");
      return;
    }
    setActiveTab(id);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: C.bgOuter,
      }}
    >
      <GlobalStyles />
      <GrainOverlay />

      {/* iPhone 17 Pro 프레임 */}
      <div
        style={{
          position: "relative",
          width: 393,
          height: 852,
          background: "#0D0D0D",
          borderRadius: 55,
          boxShadow: [
            "0 0 0 1.5px #3A3A3A",
            "0 0 0 3px #1C1C1C",
            "0 64px 130px rgba(0,0,0,0.55)",
            "0 24px 48px rgba(0,0,0,0.3)",
            "inset 0 1px 0 rgba(255,255,255,0.06)",
          ].join(","),
        }}
      >
        {/* 사이드 버튼 */}
        <SideButtons />

        {/* 스크린 베젤 */}
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: 47,
            background: C.bg,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DynamicIsland />

          {/* 콘텐츠 */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            {phase === "splash" ? (
              <SplashScreen onStart={goToApp} />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* 탭 패널 — absolute 레이어 페이드 전환 */}
                <div
                  style={{ flex: 1, overflow: "hidden", position: "relative" }}
                >
                  {TABS.map(({ id, Tab }) => (
                    <div
                      key={id}
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: activeTab === id ? 1 : 0,
                        pointerEvents: activeTab === id ? "all" : "none",
                        transition: "opacity 0.3s ease",
                        zIndex: activeTab === id ? 10 : 0,
                      }}
                    >
                      <Tab />
                    </div>
                  ))}
                </div>
                <BottomNav active={activeTab} onSwitch={handleTab} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
