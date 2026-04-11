"use client";

interface GlowMushroomProps {
  className?: string;
  size?: number;
}

export default function GlowMushroom({ className = "", size = 200 }: GlowMushroomProps) {
  const id = `mush-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes mushGlow {
          0%, 100% {
            opacity: 0.4;
            filter: drop-shadow(0 0 8px rgba(0,229,255,0.3));
          }
          50% {
            opacity: 0.9;
            filter: drop-shadow(0 0 25px rgba(0,229,255,0.6));
          }
        }
        @keyframes sporeDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.5; }
          100% { transform: translateY(-60px) translateX(15px); opacity: 0; }
        }
        @keyframes gilPulse {
          0%, 100% { stroke-opacity: 0.3; }
          50% { stroke-opacity: 0.7; }
        }
        @keyframes capBreath {
          0%, 100% { transform: scaleX(1) scaleY(1); transform-origin: 50% 70%; }
          50% { transform: scaleX(1.02) scaleY(0.98); transform-origin: 50% 70%; }
        }
        .mush-glow { animation: mushGlow 4s ease-in-out infinite; }
        .spore { animation: sporeDrift 5s ease-out infinite; }
        .gill-pulse { animation: gilPulse 3s ease-in-out infinite; }
        .cap-breath { animation: capBreath 6s ease-in-out infinite; }
      `}</style>

      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="cap-breath"
      >
        <defs>
          <radialGradient id={`${id}-cap`} cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#7c4dff" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#3d1552" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1a0520" stopOpacity="1" />
          </radialGradient>
          <linearGradient id={`${id}-stem`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d2040" />
            <stop offset="50%" stopColor="#1a1228" />
            <stop offset="100%" stopColor="#0d0a15" />
          </linearGradient>
          <radialGradient id={`${id}-underglow`} cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#7c4dff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-spot`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-blur`}>
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id={`${id}-blur-sm`}>
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="100" cy="185" rx="45" ry="8" fill="#00e5ff" opacity="0.06" filter={`url(#${id}-blur)`} />

        {/* Stem */}
        <path
          d="M88 115 Q85 140 82 160 Q80 175 85 185 Q90 190 100 190 Q110 190 115 185 Q118 175 116 160 Q114 140 112 115"
          fill={`url(#${id}-stem)`}
          stroke="#2a1d3d"
          strokeWidth="0.5"
        />

        {/* Stem vein details */}
        <path d="M95 120 Q93 145 94 170 Q95 180 97 188" fill="none" stroke="#3d2a55" strokeWidth="0.5" strokeOpacity="0.5" />
        <path d="M105 120 Q107 145 106 170 Q105 180 103 188" fill="none" stroke="#3d2a55" strokeWidth="0.5" strokeOpacity="0.5" />

        {/* Stem ring / skirt */}
        <path
          d="M80 140 Q85 135 100 138 Q115 135 120 140 Q115 145 100 142 Q85 145 80 140"
          fill="#2a1d3d"
          stroke="#3d2a55"
          strokeWidth="0.5"
          opacity="0.7"
        />

        {/* Under-cap glow area */}
        <ellipse
          cx="100"
          cy="115"
          rx="55"
          ry="15"
          fill={`url(#${id}-underglow)`}
          className="mush-glow"
        />

        {/* Gill lines under cap */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI;
          const x1 = 100 + Math.cos(angle) * 15;
          const x2 = 100 + Math.cos(angle) * 50;
          const y1 = 113;
          const y2 = 118 + Math.abs(Math.cos(angle)) * 3;
          return (
            <line
              key={`gill-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#00e5ff"
              strokeWidth="0.6"
              className="gill-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          );
        })}

        {/* Main cap */}
        <path
          d="M40 110 Q40 60 70 40 Q85 30 100 28 Q115 30 130 40 Q160 60 160 110 Q150 118 130 115 Q115 112 100 112 Q85 112 70 115 Q50 118 40 110 Z"
          fill={`url(#${id}-cap)`}
          stroke="#5a2d82"
          strokeWidth="0.5"
        />

        {/* Cap highlight */}
        <path
          d="M65 55 Q80 40 100 38 Q110 40 118 48"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Bioluminescent spots on cap */}
        {[
          { cx: 75, cy: 65, r: 6 },
          { cx: 120, cy: 58, r: 7 },
          { cx: 95, cy: 48, r: 5 },
          { cx: 130, cy: 80, r: 5.5 },
          { cx: 60, cy: 88, r: 5 },
          { cx: 105, cy: 72, r: 4 },
          { cx: 145, cy: 95, r: 4 },
          { cx: 55, cy: 100, r: 3.5 },
        ].map((spot, i) => (
          <g key={`spot-${i}`}>
            <circle
              cx={spot.cx}
              cy={spot.cy}
              r={spot.r * 2}
              fill={`url(#${id}-spot)`}
              className="mush-glow"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <circle
              cx={spot.cx}
              cy={spot.cy}
              r={spot.r * 0.4}
              fill="#00e5ff"
              opacity="0.8"
              className="mush-glow"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          </g>
        ))}

        {/* Ruby accent spots */}
        {[
          { cx: 85, cy: 82, r: 3 },
          { cx: 140, cy: 68, r: 3.5 },
          { cx: 110, cy: 95, r: 2.5 },
        ].map((spot, i) => (
          <circle
            key={`ruby-spot-${i}`}
            cx={spot.cx}
            cy={spot.cy}
            r={spot.r}
            fill="#c41a3b"
            opacity="0.5"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.7;0.3"
              dur="4s"
              repeatCount="indefinite"
              begin={`${i * 0.8}s`}
            />
          </circle>
        ))}

        {/* Rising spores */}
        {[
          { cx: 70, cy: 100, delay: "0s" },
          { cx: 90, cy: 95, delay: "1.2s" },
          { cx: 110, cy: 98, delay: "0.6s" },
          { cx: 130, cy: 100, delay: "1.8s" },
          { cx: 80, cy: 105, delay: "2.4s" },
          { cx: 120, cy: 102, delay: "3s" },
          { cx: 100, cy: 92, delay: "0.3s" },
          { cx: 60, cy: 108, delay: "1.5s" },
          { cx: 140, cy: 105, delay: "2.1s" },
        ].map((s, i) => (
          <circle
            key={`spore-${i}`}
            cx={s.cx}
            cy={s.cy}
            r={1 + (i % 3) * 0.3}
            fill="#00e5ff"
            className="spore"
            style={{ animationDelay: s.delay, animationDuration: `${4 + (i % 3)}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
