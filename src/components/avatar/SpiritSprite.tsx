"use client";

interface SpiritSpriteProps {
  className?: string;
  count?: number;
  size?: number;
}

export default function SpiritSprite({ className = "", count = 8, size = 400 }: SpiritSpriteProps) {
  const sprites = Array.from({ length: Math.min(count, 30) }, (_, i) => {
    const seed = (i * 7919 + 1) % 100;
    return {
      x: 10 + (seed * 80) % 80,
      y: 10 + ((seed * 37) % 70),
      scale: 0.5 + (seed % 40) / 40,
      delay: (i * 1.3) % 8,
      driftDur: 6 + (seed % 6),
      glowDur: 3 + (seed % 4),
      driftX: -15 + (seed % 30),
      driftY: -20 - (seed % 15),
    };
  });

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <style>{`
        @keyframes spriteDrift {
          0%, 100% {
            transform: translate(var(--dx, 0px), 0) scale(var(--sc, 1));
            opacity: 0;
          }
          10% { opacity: 0.9; }
          50% {
            transform: translate(0, var(--dy, -30px)) scale(var(--sc, 1));
            opacity: 1;
          }
          90% { opacity: 0.7; }
        }
        @keyframes spriteGlow {
          0%, 100% {
            box-shadow:
              0 0 8px 2px rgba(255,255,255,0.3),
              0 0 20px 5px rgba(0,229,255,0.15);
          }
          50% {
            box-shadow:
              0 0 15px 5px rgba(255,255,255,0.5),
              0 0 35px 10px rgba(0,229,255,0.3);
          }
        }
        @keyframes wispTrail {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          100% { transform: translateY(15px) scale(0.3); opacity: 0; }
        }
        @keyframes seedRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spirit-sprite {
          position: absolute;
          border-radius: 50%;
          animation: spriteDrift var(--drift-dur, 8s) ease-in-out infinite,
                     spriteGlow var(--glow-dur, 3s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        .sprite-core {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(
            circle at 40% 35%,
            rgba(255,255,255,0.95) 0%,
            rgba(200,230,255,0.7) 25%,
            rgba(0,229,255,0.4) 50%,
            rgba(124,77,255,0.15) 75%,
            transparent 100%
          );
        }
        .sprite-wisp {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.5),
            rgba(0,229,255,0.2),
            transparent
          );
          border-radius: 0 0 1px 1px;
          animation: wispTrail 2s ease-out infinite;
        }
        .sprite-filament {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1px;
          transform-origin: 0 0;
          background: linear-gradient(
            to top,
            transparent,
            rgba(255,255,255,0.3),
            transparent
          );
          animation: seedRotate 12s linear infinite;
          border-radius: 1px;
        }
      `}</style>

      {sprites.map((sprite, i) => {
        const baseSize = 8 * sprite.scale;
        return (
          <div
            key={`sprite-${i}`}
            className="spirit-sprite"
            style={{
              left: `${sprite.x}%`,
              top: `${sprite.y}%`,
              width: `${baseSize}px`,
              height: `${baseSize}px`,
              "--dx": `${sprite.driftX}px`,
              "--dy": `${sprite.driftY}px`,
              "--sc": sprite.scale,
              "--delay": `${sprite.delay}s`,
              "--drift-dur": `${sprite.driftDur}s`,
              "--glow-dur": `${sprite.glowDur}s`,
            } as React.CSSProperties}
          >
            <div className="sprite-core" />

            {/* Trailing wisps */}
            {[0, 1, 2].map((w) => (
              <div
                key={`wisp-${w}`}
                className="sprite-wisp"
                style={{
                  height: `${8 + w * 4}px`,
                  animationDelay: `${w * 0.3}s`,
                  left: `${45 + w * 5}%`,
                  opacity: 0.6 - w * 0.15,
                }}
              />
            ))}

            {/* Radial filaments (dandelion seed effect) */}
            {Array.from({ length: 6 }).map((_, f) => (
              <div
                key={`filament-${f}`}
                className="sprite-filament"
                style={{
                  height: `${baseSize * 1.2 + f * 2}px`,
                  transform: `rotate(${f * 60}deg)`,
                  animationDelay: `${f * 0.5}s`,
                  animationDirection: f % 2 === 0 ? "normal" : "reverse",
                }}
              />
            ))}
          </div>
        );
      })}

      {/* Ambient background glow */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <defs>
          <radialGradient id="sprite-ambient">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#sprite-ambient)" />
      </svg>
    </div>
  );
}
