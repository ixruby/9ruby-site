"use client";

interface CoralReefProps {
  className?: string;
  width?: number;
}

export default function CoralReef({ className = "", width = 500 }: CoralReefProps) {
  const h = width * 0.6;

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes coralSway {
          0%, 100% { transform: rotate(-1.5deg); transform-origin: bottom center; }
          50% { transform: rotate(1.5deg); transform-origin: bottom center; }
        }
        @keyframes coralSwayAlt {
          0%, 100% { transform: rotate(1deg); transform-origin: bottom center; }
          50% { transform: rotate(-1deg); transform-origin: bottom center; }
        }
        @keyframes bubbleRise {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100px) scale(0.3); opacity: 0; }
        }
        @keyframes coralGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        .coral-sway { animation: coralSway 5s ease-in-out infinite; }
        .coral-sway-alt { animation: coralSwayAlt 6s ease-in-out infinite; }
        .coral-glow { animation: coralGlow 4s ease-in-out infinite; }
        .bubble { animation: bubbleRise 4s ease-out infinite; }
      `}</style>

      <svg
        width={width}
        height={h}
        viewBox="0 0 500 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="coral-ruby" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff5252" />
            <stop offset="100%" stopColor="#8b6b3d" />
          </linearGradient>
          <linearGradient id="coral-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#0097a7" />
          </linearGradient>
          <linearGradient id="coral-purple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b388ff" />
            <stop offset="100%" stopColor="#7c4dff" />
          </linearGradient>
          <linearGradient id="coral-orange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffab40" />
            <stop offset="100%" stopColor="#ff6d00" />
          </linearGradient>
          <linearGradient id="coral-pink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff80ab" />
            <stop offset="100%" stopColor="#8b6b3d" />
          </linearGradient>
          <filter id="coral-blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Sea floor / sand base */}
        <path
          d="M0 280 Q50 272 100 278 Q150 284 200 276 Q250 270 300 278 Q350 284 400 276 Q450 272 500 280 L500 300 L0 300 Z"
          fill="#1a1520"
        />
        <path
          d="M0 285 Q80 278 160 282 Q240 288 320 280 Q400 275 500 284 L500 300 L0 300 Z"
          fill="#120e18"
        />

        {/* Large branching coral - Ruby (center-left) */}
        <g className="coral-sway" style={{ animationDelay: "0s" }}>
          <path
            d="M120 280 Q118 250 115 220 Q112 190 120 170 Q125 155 118 140 Q112 125 120 110"
            fill="none" stroke="url(#coral-ruby)" strokeWidth="8" strokeLinecap="round"
          />
          <path
            d="M118 200 Q100 185 88 165 Q80 150 85 135"
            fill="none" stroke="url(#coral-ruby)" strokeWidth="5" strokeLinecap="round"
          />
          <path
            d="M120 180 Q140 168 150 148 Q155 135 148 120"
            fill="none" stroke="url(#coral-ruby)" strokeWidth="5" strokeLinecap="round"
          />
          <path
            d="M88 165 Q78 150 72 140"
            fill="none" stroke="url(#coral-ruby)" strokeWidth="3" strokeLinecap="round"
          />
          <path
            d="M88 165 Q95 148 90 130"
            fill="none" stroke="url(#coral-ruby)" strokeWidth="3" strokeLinecap="round"
          />
          {/* Glowing tips */}
          {[
            { cx: 120, cy: 110, r: 4 },
            { cx: 85, cy: 135, r: 3.5 },
            { cx: 148, cy: 120, r: 3.5 },
            { cx: 72, cy: 140, r: 2.5 },
            { cx: 90, cy: 130, r: 2.5 },
          ].map((t, i) => (
            <circle
              key={`ruby-tip-${i}`}
              cx={t.cx} cy={t.cy} r={t.r}
              fill="#ff5252"
              className="coral-glow"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
          ))}
        </g>

        {/* Fan coral - Cyan (center) */}
        <g className="coral-sway-alt" style={{ animationDelay: "0.5s" }}>
          <path
            d="M250 280 Q248 260 250 240 Q252 220 250 200"
            fill="none" stroke="url(#coral-cyan)" strokeWidth="6" strokeLinecap="round"
          />
          {/* Fan branches radiating */}
          {[-35, -20, -8, 5, 18, 32].map((angle, i) => (
            <path
              key={`fan-${i}`}
              d={`M250 200 Q${250 + angle * 1.5} ${170 - Math.abs(angle) * 0.3} ${250 + angle * 2.5} ${140 - Math.abs(angle) * 0.2}`}
              fill="none"
              stroke="url(#coral-cyan)"
              strokeWidth={2.5 - Math.abs(i - 2.5) * 0.3}
              strokeLinecap="round"
              strokeOpacity={0.9 - Math.abs(i - 2.5) * 0.1}
            />
          ))}
          {/* Cross connections in fan */}
          {[160, 175, 190].map((y, i) => (
            <path
              key={`fan-cross-${i}`}
              d={`M${210 + i * 5} ${y} Q250 ${y - 5} ${290 - i * 5} ${y}`}
              fill="none"
              stroke="#00e5ff"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          ))}
        </g>

        {/* Tube coral cluster - Purple (right) */}
        <g className="coral-sway" style={{ animationDelay: "1s" }}>
          {[
            { x: 350, h: 70, w: 7 },
            { x: 360, h: 85, w: 8 },
            { x: 372, h: 60, w: 6 },
            { x: 382, h: 75, w: 7 },
            { x: 340, h: 55, w: 6 },
            { x: 392, h: 65, w: 6 },
          ].map((tube, i) => (
            <g key={`tube-${i}`}>
              <rect
                x={tube.x - tube.w / 2}
                y={280 - tube.h}
                width={tube.w}
                height={tube.h}
                rx={tube.w / 2}
                fill="url(#coral-purple)"
                opacity="0.8"
              />
              <ellipse
                cx={tube.x}
                cy={280 - tube.h}
                rx={tube.w / 2 + 1}
                ry={2}
                fill="#b388ff"
                className="coral-glow"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </g>
          ))}
        </g>

        {/* Brain coral - Orange (far left) */}
        <g className="coral-sway-alt" style={{ animationDelay: "0.3s" }}>
          <ellipse cx="50" cy="265" rx="30" ry="20" fill="url(#coral-orange)" opacity="0.8" />
          {/* Brain ridges */}
          {[
            "M28 260 Q40 255 52 260 Q62 265 72 260",
            "M25 268 Q38 263 50 268 Q60 273 75 268",
            "M30 255 Q42 250 55 255 Q65 258 70 254",
          ].map((d, i) => (
            <path
              key={`brain-${i}`}
              d={d}
              fill="none"
              stroke="#ff6d00"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
          ))}
        </g>

        {/* Small anemone-like coral - Pink (between center and right) */}
        <g className="coral-sway" style={{ animationDelay: "1.5s" }}>
          <line x1="310" y1="280" x2="310" y2="250" stroke="#8b6b3d" strokeWidth="4" strokeLinecap="round" />
          {[-20, -12, -4, 4, 12, 20].map((a, i) => (
            <path
              key={`anem-${i}`}
              d={`M310 250 Q${310 + a} ${235 - Math.abs(a) * 0.3} ${310 + a * 1.8} ${220}`}
              fill="none"
              stroke="url(#coral-pink)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
          ))}
          {[-20, -12, -4, 4, 12, 20].map((a, i) => (
            <circle
              key={`anem-tip-${i}`}
              cx={310 + a * 1.8}
              cy={220}
              r="2.5"
              fill="#ff80ab"
              className="coral-glow"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>

        {/* Seagrass strands */}
        {[
          { x: 170, h: 50 }, { x: 180, h: 40 }, { x: 190, h: 55 },
          { x: 420, h: 45 }, { x: 430, h: 60 }, { x: 440, h: 38 },
        ].map((g2, i) => (
          <path
            key={`grass-${i}`}
            d={`M${g2.x} 280 Q${g2.x + (i % 2 === 0 ? 8 : -8)} ${280 - g2.h / 2} ${g2.x + (i % 2 === 0 ? 5 : -5)} ${280 - g2.h}`}
            fill="none"
            stroke="#2d8a5e"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            className={i % 2 === 0 ? "coral-sway" : "coral-sway-alt"}
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Rising bubbles */}
        {[
          { cx: 100, cy: 250, r: 3, delay: "0s", dur: "4s" },
          { cx: 245, cy: 230, r: 2, delay: "1s", dur: "5s" },
          { cx: 370, cy: 240, r: 2.5, delay: "2s", dur: "4.5s" },
          { cx: 150, cy: 260, r: 1.5, delay: "0.5s", dur: "3.5s" },
          { cx: 300, cy: 250, r: 2, delay: "1.5s", dur: "4s" },
          { cx: 420, cy: 255, r: 1.8, delay: "3s", dur: "5s" },
          { cx: 80, cy: 245, r: 1.2, delay: "2.5s", dur: "3.8s" },
          { cx: 200, cy: 235, r: 2.2, delay: "0.8s", dur: "4.2s" },
          { cx: 350, cy: 260, r: 1.5, delay: "1.8s", dur: "3.5s" },
          { cx: 460, cy: 250, r: 1.8, delay: "2.2s", dur: "4.8s" },
        ].map((b, i) => (
          <circle
            key={`bubble-${i}`}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill="none"
            stroke="#00e5ff"
            strokeWidth="0.5"
            strokeOpacity="0.6"
            className="bubble"
            style={{ animationDelay: b.delay, animationDuration: b.dur }}
          />
        ))}

        {/* Floating particles / plankton */}
        {Array.from({ length: 15 }).map((_, i) => (
          <circle
            key={`plankton-${i}`}
            cx={30 + (i * 97) % 440}
            cy={80 + (i * 53) % 180}
            r={0.5 + (i % 3) * 0.3}
            fill={["#00e5ff", "#8b6b3d", "#ffd54f", "#b388ff"][i % 4]}
          >
            <animate
              attributeName="opacity"
              values="0;0.6;0"
              dur={`${3 + (i % 3)}s`}
              repeatCount="indefinite"
              begin={`${i * 0.4}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
