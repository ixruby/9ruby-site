"use client";

import AvatarTree from "./AvatarTree";
import Jellyfish from "./Jellyfish";
import FloatingMountain from "./FloatingMountain";
import BioButterfly from "./BioButterfly";
import CoralReef from "./CoralReef";
import GlowMushroom from "./GlowMushroom";
import WaterDragon from "./WaterDragon";
import SpiritSprite from "./SpiritSprite";

interface AvatarSceneProps {
  className?: string;
  theme?: "forest" | "ocean" | "sky" | "cave";
  density?: number;
}

const themeBackgrounds = {
  forest:
    "radial-gradient(ellipse at 50% 100%, #0a1a0a 0%, #050d05 40%, #000000 100%)",
  ocean:
    "radial-gradient(ellipse at 50% 0%, #001a33 0%, #000d1a 40%, #000005 100%)",
  sky:
    "radial-gradient(ellipse at 50% 80%, #0a0020 0%, #050010 40%, #000000 100%)",
  cave:
    "radial-gradient(ellipse at 50% 50%, #120818 0%, #080510 40%, #000000 100%)",
};

export default function AvatarScene({
  className = "",
  theme = "forest",
  density = 5,
}: AvatarSceneProps) {
  const d = Math.max(1, Math.min(10, density));

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        background: themeBackgrounds[theme],
        minHeight: "600px",
      }}
    >
      <style>{`
        @keyframes sceneFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scene-element {
          animation: sceneFadeIn 1.5s ease-out both;
        }
      `}</style>

      {/* Spirit sprites always present as ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <SpiritSprite count={Math.max(3, d * 2)} size={800} />
      </div>

      {theme === "forest" && <ForestScene density={d} />}
      {theme === "ocean" && <OceanScene density={d} />}
      {theme === "sky" && <SkyScene density={d} />}
      {theme === "cave" && <CaveScene density={d} />}
    </div>
  );
}

function ForestScene({ density }: { density: number }) {
  return (
    <>
      {/* Ground-level mushrooms */}
      <div className="absolute bottom-4 left-[5%] scene-element" style={{ animationDelay: "0.2s" }}>
        <GlowMushroom size={80 + density * 8} />
      </div>
      {density >= 3 && (
        <div className="absolute bottom-8 left-[25%] scene-element" style={{ animationDelay: "0.5s" }}>
          <GlowMushroom size={60 + density * 5} />
        </div>
      )}
      {density >= 6 && (
        <div className="absolute bottom-2 right-[15%] scene-element" style={{ animationDelay: "0.8s" }}>
          <GlowMushroom size={70 + density * 6} />
        </div>
      )}

      {/* Central tree */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 scene-element" style={{ animationDelay: "0s" }}>
        <AvatarTree height={300 + density * 15} />
      </div>

      {/* Butterflies */}
      {density >= 2 && (
        <div className="absolute top-[15%] left-[20%] scene-element" style={{ animationDelay: "1s" }}>
          <BioButterfly size={60 + density * 4} color="ruby" />
        </div>
      )}
      {density >= 4 && (
        <div className="absolute top-[25%] right-[18%] scene-element" style={{ animationDelay: "1.3s" }}>
          <BioButterfly size={50 + density * 3} color="cyan" />
        </div>
      )}
      {density >= 7 && (
        <div className="absolute top-[10%] left-[55%] scene-element" style={{ animationDelay: "1.6s" }}>
          <BioButterfly size={40 + density * 3} color="gold" />
        </div>
      )}

      {/* Side trees at higher density */}
      {density >= 5 && (
        <div className="absolute bottom-0 left-[8%] scene-element opacity-60" style={{ animationDelay: "0.4s" }}>
          <AvatarTree height={200 + density * 8} />
        </div>
      )}
      {density >= 8 && (
        <div className="absolute bottom-0 right-[5%] scene-element opacity-50" style={{ animationDelay: "0.6s" }}>
          <AvatarTree height={180 + density * 6} />
        </div>
      )}
    </>
  );
}

function OceanScene({ density }: { density: number }) {
  return (
    <>
      {/* Coral reef on the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 scene-element" style={{ animationDelay: "0s" }}>
        <CoralReef width={400 + density * 15} />
      </div>

      {/* Water dragon in the mid-zone */}
      {density >= 2 && (
        <div className="absolute top-[30%] left-[5%] scene-element" style={{ animationDelay: "0.5s" }}>
          <WaterDragon width={300 + density * 15} />
        </div>
      )}

      {/* Jellyfish floating */}
      <div className="absolute top-[8%] right-[15%] scene-element" style={{ animationDelay: "0.3s" }}>
        <Jellyfish size={100 + density * 8} color="cyan" />
      </div>
      {density >= 3 && (
        <div className="absolute top-[20%] left-[12%] scene-element" style={{ animationDelay: "0.8s" }}>
          <Jellyfish size={80 + density * 5} color="purple" />
        </div>
      )}
      {density >= 5 && (
        <div className="absolute top-[5%] left-[45%] scene-element" style={{ animationDelay: "1.1s" }}>
          <Jellyfish size={70 + density * 4} color="ruby" />
        </div>
      )}
      {density >= 7 && (
        <div className="absolute top-[15%] right-[35%] scene-element" style={{ animationDelay: "1.4s" }}>
          <Jellyfish size={60 + density * 4} color="gold" />
        </div>
      )}
      {density >= 9 && (
        <div className="absolute top-[35%] right-[8%] scene-element" style={{ animationDelay: "1.7s" }}>
          <Jellyfish size={90 + density * 5} color="cyan" />
        </div>
      )}
    </>
  );
}

function SkyScene({ density }: { density: number }) {
  return (
    <>
      {/* Floating mountains */}
      <div className="absolute top-[10%] left-[10%] scene-element" style={{ animationDelay: "0s" }}>
        <FloatingMountain width={250 + density * 12} />
      </div>
      {density >= 3 && (
        <div className="absolute top-[25%] right-[8%] scene-element opacity-70" style={{ animationDelay: "0.5s" }}>
          <FloatingMountain width={200 + density * 10} />
        </div>
      )}
      {density >= 7 && (
        <div className="absolute top-[5%] left-[45%] scene-element opacity-50" style={{ animationDelay: "0.8s" }}>
          <FloatingMountain width={180 + density * 8} />
        </div>
      )}

      {/* Butterflies weaving between mountains */}
      {density >= 2 && (
        <div className="absolute top-[20%] left-[40%] scene-element" style={{ animationDelay: "1s" }}>
          <BioButterfly size={70 + density * 4} color="gold" />
        </div>
      )}
      {density >= 4 && (
        <div className="absolute top-[40%] right-[25%] scene-element" style={{ animationDelay: "1.3s" }}>
          <BioButterfly size={60 + density * 3} color="ruby" />
        </div>
      )}
      {density >= 6 && (
        <div className="absolute top-[15%] right-[40%] scene-element" style={{ animationDelay: "1.5s" }}>
          <BioButterfly size={50 + density * 3} color="purple" />
        </div>
      )}

      {/* Jellyfish drifting in the sky */}
      {density >= 5 && (
        <div className="absolute bottom-[20%] left-[20%] scene-element" style={{ animationDelay: "0.7s" }}>
          <Jellyfish size={80 + density * 4} color="purple" />
        </div>
      )}
      {density >= 8 && (
        <div className="absolute bottom-[30%] right-[15%] scene-element" style={{ animationDelay: "1s" }}>
          <Jellyfish size={70 + density * 3} color="cyan" />
        </div>
      )}
    </>
  );
}

function CaveScene({ density }: { density: number }) {
  return (
    <>
      {/* Mushroom cluster - primary */}
      <div className="absolute bottom-4 left-[15%] scene-element" style={{ animationDelay: "0s" }}>
        <GlowMushroom size={120 + density * 10} />
      </div>
      <div className="absolute bottom-8 left-[35%] scene-element" style={{ animationDelay: "0.3s" }}>
        <GlowMushroom size={90 + density * 8} />
      </div>
      <div className="absolute bottom-2 right-[20%] scene-element" style={{ animationDelay: "0.5s" }}>
        <GlowMushroom size={100 + density * 9} />
      </div>

      {/* Additional mushrooms at higher density */}
      {density >= 3 && (
        <div className="absolute bottom-12 right-[40%] scene-element" style={{ animationDelay: "0.7s" }}>
          <GlowMushroom size={70 + density * 6} />
        </div>
      )}
      {density >= 5 && (
        <div className="absolute bottom-6 left-[55%] scene-element" style={{ animationDelay: "0.9s" }}>
          <GlowMushroom size={80 + density * 5} />
        </div>
      )}
      {density >= 7 && (
        <>
          <div className="absolute bottom-0 left-[3%] scene-element" style={{ animationDelay: "1.1s" }}>
            <GlowMushroom size={60 + density * 4} />
          </div>
          <div className="absolute bottom-4 right-[5%] scene-element" style={{ animationDelay: "1.3s" }}>
            <GlowMushroom size={65 + density * 4} />
          </div>
        </>
      )}

      {/* Coral growing on cave walls */}
      {density >= 4 && (
        <div className="absolute bottom-0 left-[50%] -translate-x-1/2 opacity-60 scene-element" style={{ animationDelay: "0.4s" }}>
          <CoralReef width={350 + density * 10} />
        </div>
      )}

      {/* Cave ceiling stalactites via a thin SVG */}
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        height="120"
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cave-ceil" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1020" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="800" height="40" fill="#0a0510" />
        {[80, 160, 280, 400, 520, 640, 720].map((x, i) => (
          <path
            key={`stal-${i}`}
            d={`M${x - 15} 40 Q${x} ${60 + (i % 3) * 20} ${x + 15} 40`}
            fill="#1a1020"
            stroke="#2a1535"
            strokeWidth="0.5"
          />
        ))}
        {/* Drip glow points */}
        {[80, 280, 520, 720].map((x, i) => (
          <circle
            key={`drip-${i}`}
            cx={x}
            cy={60 + (i % 3) * 20}
            r="2"
            fill="#00e5ff"
            opacity="0.6"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 0.7}s`}
            />
          </circle>
        ))}
      </svg>

      {/* Butterflies deep in cave */}
      {density >= 6 && (
        <div className="absolute top-[30%] left-[30%] scene-element" style={{ animationDelay: "1.5s" }}>
          <BioButterfly size={50 + density * 3} color="purple" />
        </div>
      )}
      {density >= 8 && (
        <div className="absolute top-[25%] right-[25%] scene-element" style={{ animationDelay: "1.8s" }}>
          <BioButterfly size={45 + density * 2} color="cyan" />
        </div>
      )}
    </>
  );
}
