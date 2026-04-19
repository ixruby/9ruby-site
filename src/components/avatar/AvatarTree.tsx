"use client";

interface AvatarTreeProps {
  className?: string;
  height?: number;
}

export default function AvatarTree({ className = "", height = 400 }: AvatarTreeProps) {
  const w = height * 0.75;
  const id = "avatar-tree";

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes treeSway {
          0%, 100% { transform: rotate(-0.8deg); transform-origin: bottom center; }
          50% { transform: rotate(0.8deg); transform-origin: bottom center; }
        }
        @keyframes nodeGlow {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 4px var(--glow)); }
          50% { opacity: 1; filter: drop-shadow(0 0 12px var(--glow)); }
        }
        @keyframes rootPulse {
          0%, 100% { stroke-opacity: 0.3; }
          50% { stroke-opacity: 0.8; }
        }
        @keyframes tendrilWave {
          0%, 100% { d: path(var(--d1)); }
          50% { d: path(var(--d2)); }
        }
        .avatar-tree-wrap { animation: treeSway 7s ease-in-out infinite; }
        .glow-node {
          --glow: #00e5ff;
          animation: nodeGlow 3s ease-in-out infinite;
        }
        .glow-node-ruby {
          --glow: #8b6b3d;
          animation: nodeGlow 3.5s ease-in-out infinite;
        }
        .glow-node-gold {
          --glow: #ffd54f;
          animation: nodeGlow 4s ease-in-out infinite;
        }
        .root-strand { animation: rootPulse 4s ease-in-out infinite; }
      `}</style>

      <svg
        width={w}
        height={height}
        viewBox="0 0 300 400"
        xmlns="http://www.w3.org/2000/svg"
        className="avatar-tree-wrap"
      >
        <defs>
          <radialGradient id={`${id}-trunk`} cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#5a1a6e" />
            <stop offset="60%" stopColor="#2d0a3a" />
            <stop offset="100%" stopColor="#1a0520" />
          </radialGradient>
          <radialGradient id={`${id}-glow-cyan`}>
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="1" />
            <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-glow-ruby`}>
            <stop offset="0%" stopColor="#8b6b3d" stopOpacity="1" />
            <stop offset="50%" stopColor="#8b6b3d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b6b3d" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-blur`}>
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Root tendrils glowing on the ground */}
        {[
          { d: "M150 380 Q120 370 80 385", delay: "0s" },
          { d: "M150 380 Q130 375 60 390", delay: "0.5s" },
          { d: "M150 380 Q180 370 220 385", delay: "1s" },
          { d: "M150 380 Q170 375 240 390", delay: "1.5s" },
          { d: "M150 380 Q140 385 100 395", delay: "0.8s" },
          { d: "M150 380 Q160 385 200 395", delay: "1.2s" },
        ].map((root, i) => (
          <path
            key={`root-${i}`}
            d={root.d}
            fill="none"
            stroke="#00e5ff"
            strokeWidth="1.5"
            className="root-strand"
            style={{ animationDelay: root.delay }}
          />
        ))}

        {/* Main trunk */}
        <path
          d="M140 380 Q138 320 135 260 Q130 200 125 160 Q120 120 130 90 Q135 70 150 50"
          fill="none"
          stroke={`url(#${id}-trunk)`}
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M160 380 Q162 320 165 260 Q170 200 175 160 Q180 120 170 90 Q165 70 150 50"
          fill="none"
          stroke={`url(#${id}-trunk)`}
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Inner glow veins on trunk */}
        <path
          d="M150 370 Q148 310 147 250 Q145 190 143 150 Q140 110 145 80 Q148 65 150 55"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="1"
          strokeOpacity="0.3"
          className="root-strand"
        />

        {/* Branches */}
        {[
          "M150 55 Q120 40 90 25",
          "M150 55 Q180 35 210 20",
          "M150 55 Q140 30 115 10",
          "M150 55 Q160 30 185 10",
          "M150 55 Q130 50 100 55",
          "M150 55 Q170 50 200 55",
          "M145 90 Q115 75 80 65",
          "M155 90 Q185 75 220 65",
          "M140 120 Q110 105 70 100",
          "M160 120 Q190 105 230 100",
          "M135 150 Q105 140 65 140",
          "M165 150 Q195 140 235 140",
        ].map((d, i) => (
          <path
            key={`branch-${i}`}
            d={d}
            fill="none"
            stroke="#3d1552"
            strokeWidth={3 - (i % 3) * 0.5}
            strokeLinecap="round"
          />
        ))}

        {/* Drooping tendrils from branches */}
        {[
          { d: "M90 25 Q88 40 85 55", delay: "0s" },
          { d: "M210 20 Q212 35 215 50", delay: "0.7s" },
          { d: "M80 65 Q78 80 75 100", delay: "1.2s" },
          { d: "M220 65 Q222 80 225 100", delay: "0.3s" },
          { d: "M65 140 Q60 160 58 175", delay: "0.9s" },
          { d: "M235 140 Q240 160 242 175", delay: "1.5s" },
          { d: "M100 55 Q95 70 93 85", delay: "0.4s" },
          { d: "M200 55 Q205 70 207 85", delay: "1.1s" },
        ].map((t, i) => (
          <path
            key={`tendril-${i}`}
            d={t.d}
            fill="none"
            stroke="#5a2d82"
            strokeWidth="1"
            strokeOpacity="0.6"
            className="root-strand"
            style={{ animationDelay: t.delay }}
          />
        ))}

        {/* Glowing tip nodes - Cyan */}
        {[
          { cx: 90, cy: 25, r: 5, delay: "0s" },
          { cx: 210, cy: 20, r: 5.5, delay: "0.8s" },
          { cx: 115, cy: 10, r: 4, delay: "1.2s" },
          { cx: 185, cy: 10, r: 4.5, delay: "0.4s" },
          { cx: 80, cy: 65, r: 4, delay: "1.6s" },
          { cx: 220, cy: 65, r: 4.5, delay: "0.6s" },
          { cx: 65, cy: 140, r: 3.5, delay: "2s" },
          { cx: 235, cy: 140, r: 3.5, delay: "1s" },
        ].map((n, i) => (
          <g key={`node-cyan-${i}`}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r * 3}
              fill={`url(#${id}-glow-cyan)`}
              className="glow-node"
              style={{ animationDelay: n.delay }}
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="#00e5ff"
              className="glow-node"
              style={{ animationDelay: n.delay }}
            />
          </g>
        ))}

        {/* Glowing tip nodes - Ruby */}
        {[
          { cx: 100, cy: 55, r: 4, delay: "0.3s" },
          { cx: 200, cy: 55, r: 4, delay: "1.1s" },
          { cx: 70, cy: 100, r: 3.5, delay: "1.8s" },
          { cx: 230, cy: 100, r: 3.5, delay: "0.5s" },
          { cx: 150, cy: 50, r: 6, delay: "0s" },
        ].map((n, i) => (
          <g key={`node-ruby-${i}`}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r * 3}
              fill={`url(#${id}-glow-ruby)`}
              className="glow-node-ruby"
              style={{ animationDelay: n.delay }}
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="#8b6b3d"
              className="glow-node-ruby"
              style={{ animationDelay: n.delay }}
            />
          </g>
        ))}

        {/* Tiny gold spirit particles drifting upward */}
        {[
          { cx: 130, cy: 40, r: 1.5, delay: "0s" },
          { cx: 170, cy: 35, r: 1, delay: "1s" },
          { cx: 110, cy: 50, r: 1.2, delay: "2s" },
          { cx: 190, cy: 45, r: 1, delay: "1.5s" },
          { cx: 150, cy: 30, r: 1.3, delay: "0.5s" },
        ].map((p, i) => (
          <circle
            key={`spirit-${i}`}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#ffd54f"
            className="glow-node-gold"
            style={{ animationDelay: p.delay }}
          />
        ))}

        {/* Ground shadow/mist */}
        <ellipse
          cx="150"
          cy="390"
          rx="100"
          ry="10"
          fill="#00e5ff"
          opacity="0.08"
          filter={`url(#${id}-blur)`}
        />
      </svg>
    </div>
  );
}
