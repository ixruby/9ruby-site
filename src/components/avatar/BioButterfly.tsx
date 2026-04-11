"use client";

interface BioButterflyProps {
  className?: string;
  size?: number;
  color?: "ruby" | "cyan" | "gold" | "purple";
}

const colorSchemes = {
  ruby: { wing1: "#c41a3b", wing2: "#ff5252", accent: "#ffd54f", vein: "#ff8a80" },
  cyan: { wing1: "#00e5ff", wing2: "#00bcd4", accent: "#c41a3b", vein: "#80deea" },
  gold: { wing1: "#ffd54f", wing2: "#ffab40", accent: "#c41a3b", vein: "#ffe082" },
  purple: { wing1: "#7c4dff", wing2: "#b388ff", accent: "#00e5ff", vein: "#d1c4e9" },
};

export default function BioButterfly({ className = "", size = 120, color = "ruby" }: BioButterflyProps) {
  const c = colorSchemes[color];
  const id = `bio-fly-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes figure8 {
          0% { transform: translate(0, 0) rotate(0deg); }
          12.5% { transform: translate(20px, -15px) rotate(5deg); }
          25% { transform: translate(40px, 0) rotate(0deg); }
          37.5% { transform: translate(20px, 15px) rotate(-5deg); }
          50% { transform: translate(0, 0) rotate(0deg); }
          62.5% { transform: translate(-20px, -15px) rotate(-5deg); }
          75% { transform: translate(-40px, 0) rotate(0deg); }
          87.5% { transform: translate(-20px, 15px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes wingFlap {
          0%, 100% { transform: scaleX(1) rotateY(0deg); }
          25% { transform: scaleX(0.3) rotateY(60deg); }
          50% { transform: scaleX(1) rotateY(0deg); }
          75% { transform: scaleX(0.3) rotateY(-60deg); }
        }
        @keyframes wingGlow {
          0%, 100% { filter: drop-shadow(0 0 4px var(--wg)); opacity: 0.85; }
          50% { filter: drop-shadow(0 0 14px var(--wg)); opacity: 1; }
        }
        @keyframes antennaBob {
          0%, 100% { transform: rotate(-5deg); transform-origin: bottom center; }
          50% { transform: rotate(5deg); transform-origin: bottom center; }
        }
        .butterfly-flight { animation: figure8 12s ease-in-out infinite; }
        .butterfly-wings {
          animation: wingFlap 0.6s ease-in-out infinite;
          transform-origin: center;
          perspective: 200px;
        }
        .wing-surface {
          --wg: ${c.wing1};
          animation: wingGlow 3s ease-in-out infinite;
        }
        .antenna-l { animation: antennaBob 2s ease-in-out infinite; }
        .antenna-r { animation: antennaBob 2s ease-in-out infinite 0.3s; }
      `}</style>

      <div className="butterfly-flight">
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          className="butterfly-wings"
        >
          <defs>
            <radialGradient id={`${id}-wing-l`} cx="30%" cy="40%" r="70%">
              <stop offset="0%" stopColor={c.wing2} stopOpacity="0.9" />
              <stop offset="50%" stopColor={c.wing1} stopOpacity="0.7" />
              <stop offset="100%" stopColor={c.wing1} stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id={`${id}-wing-r`} cx="70%" cy="40%" r="70%">
              <stop offset="0%" stopColor={c.wing2} stopOpacity="0.9" />
              <stop offset="50%" stopColor={c.wing1} stopOpacity="0.7" />
              <stop offset="100%" stopColor={c.wing1} stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id={`${id}-wing-bl`} cx="35%" cy="50%" r="65%">
              <stop offset="0%" stopColor={c.accent} stopOpacity="0.8" />
              <stop offset="60%" stopColor={c.wing1} stopOpacity="0.5" />
              <stop offset="100%" stopColor={c.wing1} stopOpacity="0.2" />
            </radialGradient>
            <radialGradient id={`${id}-wing-br`} cx="65%" cy="50%" r="65%">
              <stop offset="0%" stopColor={c.accent} stopOpacity="0.8" />
              <stop offset="60%" stopColor={c.wing1} stopOpacity="0.5" />
              <stop offset="100%" stopColor={c.wing1} stopOpacity="0.2" />
            </radialGradient>
            <filter id={`${id}-glow`}>
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Upper left wing */}
          <path
            d="M60 55 Q30 30 15 25 Q5 22 8 38 Q10 50 25 58 Q40 65 60 60"
            fill={`url(#${id}-wing-l)`}
            className="wing-surface"
          />
          {/* Upper right wing */}
          <path
            d="M60 55 Q90 30 105 25 Q115 22 112 38 Q110 50 95 58 Q80 65 60 60"
            fill={`url(#${id}-wing-r)`}
            className="wing-surface"
          />

          {/* Lower left wing */}
          <path
            d="M60 62 Q35 65 20 75 Q12 82 18 88 Q28 92 42 85 Q52 78 60 68"
            fill={`url(#${id}-wing-bl)`}
            className="wing-surface"
            style={{ animationDelay: "0.1s" }}
          />
          {/* Lower right wing */}
          <path
            d="M60 62 Q85 65 100 75 Q108 82 102 88 Q92 92 78 85 Q68 78 60 68"
            fill={`url(#${id}-wing-br)`}
            className="wing-surface"
            style={{ animationDelay: "0.1s" }}
          />

          {/* Wing veins - left */}
          {[
            "M60 57 Q42 42 20 30",
            "M60 57 Q38 48 15 40",
            "M60 60 Q45 55 28 52",
            "M60 63 Q42 68 25 78",
          ].map((d, i) => (
            <path
              key={`vein-l-${i}`}
              d={d}
              fill="none"
              stroke={c.vein}
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          ))}
          {/* Wing veins - right */}
          {[
            "M60 57 Q78 42 100 30",
            "M60 57 Q82 48 105 40",
            "M60 60 Q75 55 92 52",
            "M60 63 Q78 68 95 78",
          ].map((d, i) => (
            <path
              key={`vein-r-${i}`}
              d={d}
              fill="none"
              stroke={c.vein}
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          ))}

          {/* Wing spots / eye marks */}
          <circle cx="32" cy="40" r="5" fill={c.accent} opacity="0.6" />
          <circle cx="32" cy="40" r="2.5" fill="#ffffff" opacity="0.4" />
          <circle cx="88" cy="40" r="5" fill={c.accent} opacity="0.6" />
          <circle cx="88" cy="40" r="2.5" fill="#ffffff" opacity="0.4" />
          <circle cx="35" cy="78" r="3" fill={c.wing2} opacity="0.5" />
          <circle cx="85" cy="78" r="3" fill={c.wing2} opacity="0.5" />

          {/* Body */}
          <ellipse cx="60" cy="60" rx="3" ry="12" fill="#1a1a2e" stroke={c.wing1} strokeWidth="0.5" />

          {/* Head */}
          <circle cx="60" cy="47" r="3" fill="#1a1a2e" stroke={c.wing1} strokeWidth="0.5" />

          {/* Antennae */}
          <path
            d="M58 45 Q52 30 48 25"
            fill="none"
            stroke={c.wing1}
            strokeWidth="0.8"
            className="antenna-l"
          />
          <circle cx="48" cy="25" r="1.5" fill={c.accent} opacity="0.9" />
          <path
            d="M62 45 Q68 30 72 25"
            fill="none"
            stroke={c.wing1}
            strokeWidth="0.8"
            className="antenna-r"
          />
          <circle cx="72" cy="25" r="1.5" fill={c.accent} opacity="0.9" />

          {/* Trailing sparkle dust */}
          {[
            { cx: 55, cy: 85, r: 1, delay: 0 },
            { cx: 65, cy: 88, r: 0.8, delay: 0.3 },
            { cx: 50, cy: 92, r: 0.6, delay: 0.6 },
            { cx: 70, cy: 95, r: 0.7, delay: 0.9 },
            { cx: 58, cy: 98, r: 0.5, delay: 1.2 },
          ].map((s, i) => (
            <circle
              key={`dust-${i}`}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill={c.accent}
            >
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur="2s"
                repeatCount="indefinite"
                begin={`${s.delay}s`}
              />
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}
