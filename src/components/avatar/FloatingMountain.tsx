"use client";

interface FloatingMountainProps {
  className?: string;
  width?: number;
}

export default function FloatingMountain({ className = "", width = 400 }: FloatingMountainProps) {
  const h = width * 0.85;
  const id = "float-mtn";

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes mountainBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes vineSwing {
          0%, 100% { transform: rotate(-2deg); transform-origin: top center; }
          50% { transform: rotate(2deg); transform-origin: top center; }
        }
        @keyframes mistDrift {
          0% { opacity: 0; transform: translateX(-20px) scale(0.8); }
          30% { opacity: 0.4; }
          70% { opacity: 0.3; }
          100% { opacity: 0; transform: translateX(30px) scale(1.3); }
        }
        @keyframes waterfall {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -30; }
        }
        .mtn-bob { animation: mountainBob 6s ease-in-out infinite; }
        .vine-swing { animation: vineSwing 4s ease-in-out infinite; }
        .mist-cloud { animation: mistDrift 8s ease-in-out infinite; }
        .waterfall-line {
          stroke-dasharray: 8 12;
          animation: waterfall 1.5s linear infinite;
        }
      `}</style>

      <svg
        width={width}
        height={h}
        viewBox="0 0 400 340"
        xmlns="http://www.w3.org/2000/svg"
        className="mtn-bob"
      >
        <defs>
          <linearGradient id={`${id}-rock`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a4a5a" />
            <stop offset="40%" stopColor="#2d2d3d" />
            <stop offset="100%" stopColor="#1a1a28" />
          </linearGradient>
          <linearGradient id={`${id}-rock2`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d3d50" />
            <stop offset="100%" stopColor="#22222f" />
          </linearGradient>
          <linearGradient id={`${id}-moss`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d8a5e" />
            <stop offset="100%" stopColor="#1a5e3a" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-blur`}>
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id={`${id}-blur-sm`}>
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Mist clouds behind */}
        {[
          { cx: 120, cy: 180, rx: 60, ry: 15, delay: "0s" },
          { cx: 280, cy: 200, rx: 50, ry: 12, delay: "2s" },
          { cx: 200, cy: 160, rx: 70, ry: 18, delay: "4s" },
          { cx: 160, cy: 220, rx: 45, ry: 10, delay: "1s" },
          { cx: 300, cy: 170, rx: 55, ry: 14, delay: "3s" },
        ].map((m, i) => (
          <ellipse
            key={`mist-${i}`}
            cx={m.cx}
            cy={m.cy}
            rx={m.rx}
            ry={m.ry}
            fill="#8ecae6"
            filter={`url(#${id}-blur)`}
            className="mist-cloud"
            style={{ animationDelay: m.delay, animationDuration: `${7 + i}s` }}
          />
        ))}

        {/* Main rocky island - large polygon */}
        <polygon
          points="100,100 170,60 250,55 320,80 340,130 330,170 310,190 260,200 200,210 140,200 110,180 90,150"
          fill={`url(#${id}-rock)`}
          stroke="#555568"
          strokeWidth="0.5"
        />

        {/* Secondary rock face for depth */}
        <polygon
          points="120,110 180,75 260,70 310,95 325,140 260,195 180,200 110,170"
          fill={`url(#${id}-rock2)`}
          opacity="0.6"
        />

        {/* Rock surface details / cracks */}
        {[
          "M140 120 L180 100 L210 105",
          "M200 90 L240 80 L280 95",
          "M130 155 L170 140 L200 150",
          "M220 130 L260 120 L300 140",
          "M160 170 L200 165 L240 175",
        ].map((d, i) => (
          <path
            key={`crack-${i}`}
            d={d}
            fill="none"
            stroke="#555568"
            strokeWidth="0.6"
            strokeOpacity="0.5"
          />
        ))}

        {/* Green moss patches on top */}
        {[
          "M150 100 Q170 88 195 95 Q180 98 150 100",
          "M210 80 Q240 68 270 78 Q250 82 210 80",
          "M120 120 Q140 110 160 115 Q145 118 120 120",
          "M260 90 Q285 80 310 92 Q290 95 260 90",
        ].map((d, i) => (
          <path
            key={`moss-${i}`}
            d={d}
            fill={`url(#${id}-moss)`}
            opacity="0.7"
          />
        ))}

        {/* Small trees on top */}
        {[
          { x: 175, y: 65, h: 20 },
          { x: 230, y: 60, h: 25 },
          { x: 270, y: 72, h: 18 },
          { x: 145, y: 85, h: 15 },
        ].map((tree, i) => (
          <g key={`tree-${i}`}>
            <line
              x1={tree.x}
              y1={tree.y}
              x2={tree.x}
              y2={tree.y - tree.h}
              stroke="#3a2d20"
              strokeWidth="2"
            />
            <ellipse
              cx={tree.x}
              cy={tree.y - tree.h - 5}
              rx={tree.h * 0.5}
              ry={tree.h * 0.4}
              fill="#1a5e3a"
              opacity="0.8"
            />
          </g>
        ))}

        {/* Hanging vines below */}
        {[
          { d: "M140 200 Q135 230 140 260 Q138 280 142 300", delay: "0s" },
          { d: "M170 205 Q168 240 175 270 Q172 290 170 310", delay: "0.5s" },
          { d: "M200 210 Q195 245 200 275 Q198 295 202 320", delay: "0.2s" },
          { d: "M230 208 Q232 240 228 268 Q230 288 226 305", delay: "0.8s" },
          { d: "M260 200 Q265 235 258 265 Q262 285 256 300", delay: "0.4s" },
          { d: "M290 195 Q295 220 288 250 Q292 270 286 285", delay: "1s" },
          { d: "M155 202 Q150 225 155 245 Q152 260 156 275", delay: "0.6s" },
          { d: "M245 205 Q248 235 243 260 Q246 275 240 290", delay: "0.3s" },
        ].map((vine, i) => (
          <path
            key={`vine-${i}`}
            d={vine.d}
            fill="none"
            stroke="#2d8a5e"
            strokeWidth={1.2 - (i % 3) * 0.2}
            strokeOpacity={0.6 + (i % 3) * 0.1}
            className="vine-swing"
            style={{ animationDelay: vine.delay }}
          />
        ))}

        {/* Hanging roots (darker) */}
        {[
          { d: "M120 175 Q115 210 125 245 Q120 265 128 285", delay: "0.7s" },
          { d: "M310 185 Q315 215 308 248 Q312 268 305 288", delay: "0.2s" },
          { d: "M185 208 Q180 240 188 265 Q183 280 190 295", delay: "0.9s" },
        ].map((root, i) => (
          <path
            key={`root-${i}`}
            d={root.d}
            fill="none"
            stroke="#5a3a20"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            className="vine-swing"
            style={{ animationDelay: root.delay }}
          />
        ))}

        {/* Waterfall stream */}
        <path
          d="M200 210 Q198 240 202 270 Q199 300 201 330"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="2"
          strokeOpacity="0.4"
          className="waterfall-line"
        />
        <path
          d="M203 210 Q205 245 201 275 Q204 305 202 335"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="1"
          strokeOpacity="0.2"
          className="waterfall-line"
          style={{ animationDelay: "0.3s" }}
        />

        {/* Glow from below */}
        <ellipse
          cx="200"
          cy="210"
          rx="100"
          ry="40"
          fill={`url(#${id}-glow)`}
        />

        {/* Small glowing nodes on vines */}
        {[
          { cx: 142, cy: 300, r: 2 },
          { cx: 170, cy: 310, r: 1.5 },
          { cx: 202, cy: 320, r: 2.5 },
          { cx: 226, cy: 305, r: 1.8 },
          { cx: 256, cy: 300, r: 2 },
        ].map((n, i) => (
          <circle
            key={`glow-node-${i}`}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="#00e5ff"
            opacity="0.7"
            style={{
              animation: "innerGlow 3s ease-in-out infinite",
              animationDelay: `${i * 0.6}s`,
            }}
          >
            <animate
              attributeName="opacity"
              values="0.4;0.9;0.4"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
