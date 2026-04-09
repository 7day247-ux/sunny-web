// ═══════════════════════════════════════════════════
//  ProjectModal.jsx
// ═══════════════════════════════════════════════════
import { useRef } from "react";
import { C, CloseIcon } from "./constants";

export default function ProjectModal({ project, onClose }) {
  const videoRef = useRef(null);

  const handleVideoReady = () => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 60,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 0 0",
          padding: "22px 22px 52px",
          width: "100%",
          maxHeight: "82%",
          overflowY: "auto",
          overflowX: "hidden",
          transform: "translateZ(0)",
          position: "relative",
          animation: "slideUp 0.38s cubic-bezier(0.32,0.72,0,1) both",
          webkitMaskImage: "-webkit-radial-gradient(white, black)",
          clipPath: "inset(0px round 24px 24px 0px 0px)",
        }}
      >
        {/* 핸들 */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 99,
            background: "#DDD",
            margin: "0 auto 20px",
          }}
        />

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
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

        {/* 카테고리 배지 */}
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.accent,
            letterSpacing: 2,
            background: "rgba(232,71,28,0.08)",
            borderRadius: 6,
            padding: "3px 8px",
            display: "inline-block",
            marginBottom: 8,
          }}
        >
          {project.cat} · {project.genre}
        </div>

        {/* 제목 */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: C.charcoal,
            letterSpacing: "-0.04em",
            lineHeight: 1.3,
            marginBottom: 4,
          }}
        >
          {project.fullTitle || project.title}
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 18 }}>
          {project.year}
        </div>

        {/* 썸네일 or 비디오 */}
        <div
          style={{
            width: "100%",
            borderRadius: 18,
            overflow: "hidden",
            background: project.bg,
            marginBottom: 18,
            position: "relative",
            backgroundColor: "#fff",
            display: "block",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {project.isVideo && project.video ? (
            // ✅ 비디오 재생 (초기 볼륨 0.3)
            <video
              ref={videoRef}
              src={project.video}
              controls
              onLoadedMetadata={handleVideoReady}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: 18,
              }}
            />
          ) : (
            // 이미지 썸네일
            <img
              src={project.img}
              alt={project.fullTitle || project.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: 18,
                marginBottom: 0,
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>

        {/* 설명 */}
        <p
          style={{
            fontSize: 13,
            color: "#555",
            lineHeight: 1.85,
            marginBottom: 18,
          }}
        >
          {project.desc}
        </p>

        {/* 태그 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                fontWeight: 600,
                background: "#F5F3EE",
                border: `1px solid ${C.border}`,
                color: "#6B7280",
                padding: "4px 10px",
                borderRadius: 8,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
