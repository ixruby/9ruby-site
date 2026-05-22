"use client";

import { useId } from "react";

interface WaterDragonProps {
  className?: string;
  width?: number;
}

export default function WaterDragon({ className = "", width = 500 }: WaterDragonProps) {
  const h = width * 0.4;
  const generatedId = useId();
  const id = `dragon-${generatedId.replace(/:/g, "")}`;

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes dragonSwim {
          0% { d: path("M50 100 Q100 70 150 100 Q200 130 250 100 Q300 70 350 100 Q400 130 450 100"); }
          50% { d: path("M50 100 Q100 130 150 100 Q200 70 250 100 Q300 130 350 100 Q400 70 450 100"); }
          100% { d: path("M50 100 Q100 70 150 100 Q200 130 250 100 Q300 70 350 100 Q400 130 450 100"); }
        }
        @keyframes dragonDrift {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(8px) translateY(-4px); }
          50% { transform: translateX(0) translateY(-2px); }
          75% { transform: translateX(-8px) translateY(-4px); }
        }
        @keyframes finWave {
          0%, 100% { transform: scaleY(1) rotate(0deg); transform-origin: bottom; }
          50% { transform: scaleY(1.3) rotate(5deg); transform-origin: bottom; }
        }
        @keyframes finWaveAlt {
          0%, 100% { transform: scaleY(1) rotate(0deg); transform-origin: top; }
          50% { transform: scaleY(1.3) rotate(-5deg); transform-origin: top; }
        }
        @keyframes eyeShine {
          0%, 90%, 100% { r: 2.5; }
          95% { r: 0.5; }
        }
        @keyframes whiskerFloat {
          0%, 100% { transform: rotate(-3deg); transform-origin: left center; }
          50% { transform: rotate(3deg); transform-origin: left center; }
        }
        @keyframes trailFade {
          0% { opacity: 0.5; stroke-width: 3; }
          100% { opacity: 0; stroke-width: 0; }
        }
        .dragon-drift { animation: dragonDrift 8s ease-in-out infinite; }
        .fin-wave { animation: finWave 3s ease-in-out infinite; }
        .fin-wave-alt { animation: finWaveAlt 3.5s ease-in-out infinite; }
        .whisker-float { animation: whiskerFloat 4s ease-in-out infinite; }
      `}</style>

      <div className="dragon-drift">
        <svg
          width={width}
          height={h}
          viewBox="0 0 500 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d47a1" />
              <stop offset="30%" stopColor="#0097a7" />
              <stop offset="60%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#00bcd4" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id={`${id}-belly`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#80deea" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id={`${id}-fin`} x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7c4dff" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id={`${id}-eye-glow`}>
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </radialGradient>
            <filter id={`${id}-glow`}>
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Water shimmer / environment lines */}
          {[60, 80, 120, 140].map((y, i) => (
            <path
              key={`water-${i}`}
              d={`M${20 + i * 30} ${y} Q${120 + i * 20} ${y - 5} ${220 + i * 30} ${y}`}
              fill="none"
              stroke="#00e5ff"
              strokeWidth="0.3"
              strokeOpacity="0.15"
            />
          ))}

          {/* Glow aura behind the body */}
          <path
            d="M60 100 Q110 65 160 100 Q210 135 260 100 Q310 65 360 100 Q410 135 440 105"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="20"
            strokeOpacity="0.06"
            filter={`url(#${id}-glow)`}
          />

          {/* Main serpentine body */}
          <path
            d="M50 100 Q100 65 150 100 Q200 135 250 100 Q300 65 350 100 Q400 135 450 105"
            fill="none"
            stroke={`url(#${id}-body)`}
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Belly line (lighter) */}
          <path
            d="M55 103 Q105 70 155 103 Q205 136 255 103 Q305 70 355 103 Q405 132 448 107"
            fill="none"
            stroke={`url(#${id}-belly)`}
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Scale pattern overlay */}
          {Array.from({ length: 20 }).map((_, i) => {
            const t = i / 20;
            const x = 50 + t * 400;
            const baseY = 100;
            const wave = Math.sin(t * Math.PI * 4) * 35;
            return (
              <circle
                key={`scale-${i}`}
                cx={x}
                cy={baseY - wave}
                r={2}
                fill="none"
                stroke="#80deea"
                strokeWidth="0.4"
                strokeOpacity="0.4"
              />
            );
          })}

          {/* Dorsal fins along the back */}
          {[
            { x: 100, baseY: 82, h: 25 },
            { x: 150, baseY: 100, h: 20 },
            { x: 250, baseY: 100, h: 22 },
            { x: 300, baseY: 82, h: 20 },
            { x: 400, baseY: 118, h: 18 },
          ].map((fin, i) => {
            const wave = Math.sin((fin.x / 400) * Math.PI * 4) * 35;
            const finY = 100 - wave;
            return (
              <path
                key={`dorsal-${i}`}
                d={`M${fin.x - 8} ${finY - 6} Q${fin.x} ${finY - fin.h} ${fin.x + 8} ${finY - 6}`}
                fill={`url(#${id}-fin)`}
                className="fin-wave"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            );
          })}

          {/* Ventral fins underneath */}
          {[
            { x: 130, h: 18 },
            { x: 220, h: 15 },
            { x: 330, h: 18 },
            { x: 420, h: 14 },
          ].map((fin, i) => {
            const wave = Math.sin((fin.x / 400) * Math.PI * 4) * 35;
            const finY = 100 - wave;
            return (
              <path
                key={`ventral-${i}`}
                d={`M${fin.x - 6} ${finY + 6} Q${fin.x} ${finY + fin.h} ${fin.x + 6} ${finY + 6}`}
                fill={`url(#${id}-fin)`}
                opacity="0.5"
                className="fin-wave-alt"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            );
          })}

          {/* Head details */}
          {/* Snout shape */}
          <path
            d="M50 100 Q35 95 25 92 Q20 95 25 100 Q20 105 25 108 Q35 105 50 100"
            fill="#0d47a1"
            stroke="#0097a7"
            strokeWidth="0.5"
          />

          {/* Eye */}
          <circle cx="42" cy="95" r="5" fill={`url(#${id}-eye-glow)`} opacity="0.3" />
          <circle cx="42" cy="95" r="3" fill="#0d1a3a" stroke="#00e5ff" strokeWidth="0.8" />
          <circle cx="42" cy="95" r="1.5" fill="#00e5ff">
            <animate
              attributeName="r"
              values="1.5;1.5;0.5;1.5;1.5"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Whiskers / barbels */}
          <path
            d="M30 96 Q20 88 10 82"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            className="whisker-float"
          />
          <path
            d="M30 104 Q20 112 10 118"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            className="whisker-float"
            style={{ animationDelay: "0.5s" }}
          />
          {/* Whisker tip glow */}
          <circle cx="10" cy="82" r="1.5" fill="#00e5ff" opacity="0.7">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="10" cy="118" r="1.5" fill="#00e5ff" opacity="0.7">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>

          {/* Tail fin */}
          <path
            d="M445 105 Q460 90 475 80 Q470 100 475 120 Q460 110 445 105"
            fill={`url(#${id}-fin)`}
            opacity="0.7"
            className="fin-wave"
          />
          <path
            d="M450 105 Q462 95 470 88"
            fill="none"
            stroke="#80deea"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
          <path
            d="M450 105 Q462 112 470 118"
            fill="none"
            stroke="#80deea"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />

          {/* Bioluminescent line along body */}
          <path
            d="M45 100 Q95 67 145 100 Q195 133 245 100 Q295 67 345 100 Q395 133 445 105"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="3 5"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.2;0.6;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>

          {/* Trailing wake particles */}
          {[
            { cx: 460, cy: 105, delay: "0s" },
            { cx: 470, cy: 100, delay: "0.3s" },
            { cx: 478, cy: 108, delay: "0.6s" },
            { cx: 485, cy: 98, delay: "0.9s" },
            { cx: 490, cy: 110, delay: "1.2s" },
          ].map((p, i) => (
            <circle
              key={`wake-${i}`}
              cx={p.cx}
              cy={p.cy}
              r={1.5 - i * 0.2}
              fill="#00e5ff"
            >
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="2s"
                repeatCount="indefinite"
                begin={p.delay}
              />
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}
