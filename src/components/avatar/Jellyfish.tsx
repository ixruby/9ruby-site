"use client";

import { useId } from "react";

interface JellyfishProps {
  className?: string;
  size?: number;
  color?: "cyan" | "ruby" | "purple" | "gold";
}

const colorMap = {
  cyan: { primary: "#00e5ff", secondary: "#7c4dff", accent: "#8b6b3d" },
  ruby: { primary: "#8b6b3d", secondary: "#7c4dff", accent: "#00e5ff" },
  purple: { primary: "#7c4dff", secondary: "#8b6b3d", accent: "#00e5ff" },
  gold: { primary: "#ffd54f", secondary: "#ff8a65", accent: "#8b6b3d" },
};

export default function Jellyfish({ className = "", size = 200, color = "cyan" }: JellyfishProps) {
  const c = colorMap[color];
  const generatedId = useId();
  const id = `jelly-${color}-${generatedId.replace(/:/g, "")}`;

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes jellyBreathe {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
          }
          30% {
            transform: scaleX(1.06) scaleY(0.92);
          }
          60% {
            transform: scaleX(0.94) scaleY(1.08);
          }
        }
        @keyframes jellyDrift {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-12px) translateX(5px);
          }
          50% {
            transform: translateY(-6px) translateX(-3px);
          }
          75% {
            transform: translateY(-15px) translateX(2px);
          }
        }
        @keyframes tentacleFlow {
          0%, 100% { d: path(var(--t1)); }
          50% { d: path(var(--t2)); }
        }
        @keyframes innerGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .jelly-body { animation: jellyBreathe 4s ease-in-out infinite; transform-origin: 50% 30%; }
        .jelly-drift { animation: jellyDrift 8s ease-in-out infinite; }
        .jelly-inner { animation: innerGlow 3s ease-in-out infinite; }
      `}</style>

      <div className="jelly-drift">
        <svg
          width={size}
          height={size * 1.4}
          viewBox="0 0 200 280"
          xmlns="http://www.w3.org/2000/svg"
          className="jelly-body"
        >
          <defs>
            <radialGradient id={`${id}-dome`} cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor={c.primary} stopOpacity="0.9" />
              <stop offset="40%" stopColor={c.secondary} stopOpacity="0.5" />
              <stop offset="80%" stopColor={c.accent} stopOpacity="0.3" />
              <stop offset="100%" stopColor={c.accent} stopOpacity="0.05" />
            </radialGradient>
            <radialGradient id={`${id}-inner`} cx="50%" cy="40%" r="40%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor={c.primary} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${id}-tentacle`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={c.primary} stopOpacity="0.6" />
              <stop offset="50%" stopColor={c.secondary} stopOpacity="0.3" />
              <stop offset="100%" stopColor={c.accent} stopOpacity="0.05" />
            </linearGradient>
            <filter id={`${id}-glow`}>
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer glow aura */}
          <ellipse
            cx="100"
            cy="65"
            rx="70"
            ry="55"
            fill={c.primary}
            opacity="0.08"
            filter={`url(#${id}-glow)`}
          />

          {/* Main dome / bell */}
          <path
            d="M30 85 Q30 15 100 15 Q170 15 170 85 Q170 100 155 105 Q130 112 100 112 Q70 112 45 105 Q30 100 30 85 Z"
            fill={`url(#${id}-dome)`}
            stroke={c.primary}
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />

          {/* Inner luminous core */}
          <ellipse
            cx="100"
            cy="60"
            rx="35"
            ry="25"
            fill={`url(#${id}-inner)`}
            className="jelly-inner"
          />

          {/* Dome detail ridges */}
          {[30, 45, 60, 75].map((y, i) => (
            <path
              key={`ridge-${i}`}
              d={`M${50 + i * 5} ${y} Q100 ${y - 8 + i * 2} ${150 - i * 5} ${y}`}
              fill="none"
              stroke={c.primary}
              strokeWidth="0.5"
              strokeOpacity={0.15 + i * 0.05}
            />
          ))}

          {/* Frilly edge / oral arms */}
          <path
            d="M45 105 Q55 118 65 108 Q75 118 85 108 Q95 118 100 110 Q105 118 115 108 Q125 118 135 108 Q145 118 155 105"
            fill="none"
            stroke={c.primary}
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />

          {/* Long trailing tentacles */}
          {[
            { d: "M55 112 Q48 155 60 190 Q68 220 55 260", delay: "0s", w: 1.5 },
            { d: "M75 114 Q65 160 78 200 Q85 235 72 270", delay: "0.3s", w: 1.2 },
            { d: "M95 115 Q88 165 95 210 Q100 245 92 275", delay: "0.6s", w: 1 },
            { d: "M105 115 Q112 165 105 210 Q100 245 108 275", delay: "0.9s", w: 1 },
            { d: "M125 114 Q135 160 122 200 Q115 235 128 270", delay: "0.4s", w: 1.2 },
            { d: "M145 112 Q152 155 140 190 Q132 220 145 260", delay: "0.7s", w: 1.5 },
          ].map((t, i) => (
            <path
              key={`tentacle-${i}`}
              d={t.d}
              fill="none"
              stroke={`url(#${id}-tentacle)`}
              strokeWidth={t.w}
              strokeLinecap="round"
              style={{
                animation: `jellyBreathe 4s ease-in-out infinite`,
                animationDelay: t.delay,
                transformOrigin: "50% 0%",
              }}
            />
          ))}

          {/* Short inner tentacles with dots */}
          {[60, 80, 100, 120, 140].map((x, i) => (
            <g key={`inner-t-${i}`}>
              <line
                x1={x}
                y1="110"
                x2={x + (i % 2 === 0 ? -5 : 5)}
                y2="145"
                stroke={c.primary}
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              <circle
                cx={x + (i % 2 === 0 ? -5 : 5)}
                cy="145"
                r="2"
                fill={c.primary}
                opacity="0.6"
                style={{
                  animation: "innerGlow 3s ease-in-out infinite",
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            </g>
          ))}

          {/* Sparkle particles around body */}
          {[
            { cx: 40, cy: 50, r: 1.2 },
            { cx: 160, cy: 45, r: 1 },
            { cx: 35, cy: 95, r: 0.8 },
            { cx: 165, cy: 90, r: 1.1 },
            { cx: 100, cy: 8, r: 1.3 },
          ].map((s, i) => (
            <circle
              key={`sparkle-${i}`}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="#ffffff"
              opacity="0.5"
              style={{
                animation: "innerGlow 2.5s ease-in-out infinite",
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
