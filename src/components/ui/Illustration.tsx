/**
 * Swarnavihar illustration set: still lifes of a cared-for day, in the brand palette.
 * They stand in for photography (see docs/photography-brief.md) and are honest enough to ship.
 * People are left out on purpose: we show the care, not invented residents.
 *
 * Each scene is drawn in a 400×400 box with its subject inside the central
 * 320×266 area, so it can be cropped to 4:5, 4:3, 3:2 or 16:9 without losing anything.
 */

export type Scene = "verandah" | "tea" | "medical" | "recovery" | "room" | "meal" | "daily" | "festival" | "gate";

export const sceneDescriptions: Record<Scene, string> = {
  verandah: "Illustration: two cane chairs and two glasses of chai on a sunlit verandah",
  tea: "Illustration: a garden bench with two cups of tea and the morning newspaper",
  medical: "Illustration: a care chart, stethoscope, water glass and a weekly pill organiser",
  recovery: "Illustration: a physiotherapy rail, walking stick and slippers",
  room: "Illustration: a made bed by a window, with a family photo on the bedside table",
  meal: "Illustration: a home-style thali with dal, sabzi, rice and chapatis",
  daily: "Illustration: fresh laundry folded and drying on a line",
  festival: "Illustration: a marigold garland, lit diyas and a rangoli",
  gate: "Illustration: the front gate and nameplate of a Swarnavihar home",
};

const ink = "#33503F";
const leaf = "#6B8A72";
const brass = "#B38B45";
const brassLight = "#D9C08F";
const cream = "#F7F2E7";
const paper = "#FFFFFF";
const mist = "#E3EADF";
const floor = "#D6E0D1";

const line = { stroke: ink, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const thin = { ...line, strokeWidth: 1.4 };

function Room({ children, withFloor = true }: { children: React.ReactNode; withFloor?: boolean }) {
  return (
    <>
      <rect width="400" height="400" fill={mist} />
      {withFloor && (
        <>
          <rect y="300" width="400" height="100" fill={floor} />
          <line x1="0" y1="300" x2="400" y2="300" stroke={ink} strokeOpacity="0.18" strokeWidth="2" />
        </>
      )}
      {children}
    </>
  );
}

function Chair({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x + 8} 300 V222 q0 -34 40 -34 q40 0 40 34 V300`} fill={brassLight} {...line} />
      {[22, 36, 50, 64, 78].map((dx) => (
        <line key={dx} x1={x + dx - 4} y1={203} x2={x + dx - 4} y2={262} stroke={ink} strokeOpacity="0.35" strokeWidth="1.2" />
      ))}
      <rect x={x} y={262} width={96} height={14} rx={4} fill={brass} {...line} />
      <line x1={x + 8} y1={276} x2={x + 4} y2={336} {...line} />
      <line x1={x + 88} y1={276} x2={x + 92} y2={336} {...line} />
    </g>
  );
}

function Glass({ x, y, h = 22 }: { x: number; y: number; h?: number }) {
  return (
    <g>
      <path d={`M${x} ${y} l3 ${h} h12 l3 -${h} z`} fill={paper} {...thin} />
      <path d={`M${x + 1.2} ${y + 7} l2 ${h - 7} h11.6 l2 -${h - 7} z`} fill={brass} fillOpacity="0.85" />
      <path d={`M${x + 6} ${y - 6} q-4 -6 0 -12 M${x + 12} ${y - 6} q4 -6 0 -12`} fill="none" stroke={leaf} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

function Leaves({ cx, cy, n = 5, r = 16 }: { cx: number; cy: number; n?: number; r?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = -150 + (120 / (n - 1)) * i;
        return <ellipse key={i} cx={cx} cy={cy - r} rx={r * 0.38} ry={r} fill={leaf} {...thin} transform={`rotate(${a + 90} ${cx} ${cy})`} />;
      })}
    </g>
  );
}

const scenes: Record<Scene, () => React.ReactNode> = {
  verandah: () => (
    <Room>
      <polygon points="146,300 254,300 284,372 116,372" fill={paper} fillOpacity="0.55" />
      <path d="M146 252 V146 a54 54 0 0 1 108 0 V252 Z" fill={cream} {...line} />
      <line x1="200" y1="92" x2="200" y2="252" {...thin} />
      <line x1="146" y1="182" x2="254" y2="182" {...thin} />
      <rect x="136" y="252" width="128" height="8" rx="2" fill={paper} {...line} />
      <path d="M156 252 l3 -18 h18 l3 18 z" fill={brass} {...thin} />
      <Leaves cx={168} cy={233} n={5} r={13} />
      <Chair x={36} />
      <Chair x={268} />
      <ellipse cx="200" cy="294" rx="36" ry="7" fill={paper} {...line} />
      <line x1="200" y1="301" x2="200" y2="340" {...line} />
      <line x1="182" y1="340" x2="218" y2="340" {...line} />
      <Glass x={176} y={262} h={30} />
      <Glass x={204} y={264} h={28} />
    </Room>
  ),

  tea: () => (
    <Room>
      <circle cx="318" cy="104" r="22" fill={brassLight} />
      <circle cx="104" cy="178" r="64" fill={leaf} fillOpacity="0.32" />
      <circle cx="300" cy="188" r="50" fill={leaf} fillOpacity="0.22" />
      <rect x="86" y="200" width="228" height="12" rx="3" fill={brassLight} {...line} />
      <rect x="86" y="224" width="228" height="12" rx="3" fill={brassLight} {...line} />
      <line x1="104" y1="212" x2="104" y2="262" {...line} />
      <line x1="296" y1="212" x2="296" y2="262" {...line} />
      <rect x="76" y="262" width="248" height="14" rx="4" fill={brass} {...line} />
      <line x1="96" y1="276" x2="92" y2="338" {...line} />
      <line x1="304" y1="276" x2="308" y2="338" {...line} />
      <path d="M120 262 l6 -16 h56 l-6 16 z" fill={paper} {...thin} />
      <path d="M134 252 h36 M132 257 h30" stroke={ink} strokeOpacity="0.4" strokeWidth="1.2" />
      {[218, 256].map((x) => (
        <g key={x}>
          <path d={`M${x} 238 h22 v16 a6 6 0 0 1 -6 6 h-10 a6 6 0 0 1 -6 -6 z`} fill={paper} {...thin} />
          <path d={`M${x + 22} 242 h4 a5 5 0 0 1 0 10 h-4`} fill="none" {...thin} />
          <rect x={x + 2} y={240} width="18" height="5" fill={brass} fillOpacity="0.8" />
          <path d={`M${x + 8} 232 q-4 -6 0 -12 M${x + 15} 232 q4 -6 0 -12`} fill="none" stroke={leaf} strokeWidth="1.4" strokeLinecap="round" />
        </g>
      ))}
    </Room>
  ),

  medical: () => (
    <Room>
      <rect x="250" y="96" width="78" height="96" rx="4" fill={cream} {...line} />
      <path d="M262 150 h16 l6 -12 l8 24 l6 -12 h18" fill="none" stroke={brass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="44" y="290" width="312" height="12" rx="3" fill={brassLight} {...line} />
      <rect x="72" y="160" width="92" height="130" rx="5" fill={paper} {...line} />
      <rect x="100" y="152" width="36" height="14" rx="3" fill={brass} {...line} />
      {[188, 204, 220, 236, 252].map((y) => (
        <line key={y} x1="86" y1={y} x2={y === 252 ? 126 : 150} y2={y} stroke={ink} strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      ))}
      <path d="M176 290 v-56 h26 v56" fill={paper} {...thin} />
      <rect x="177" y="252" width="24" height="37" fill={leaf} fillOpacity="0.25" />
      <rect x="212" y="262" width="122" height="28" rx="5" fill={paper} {...line} />
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1={212 + i * 17.4} y1="262" x2={212 + i * 17.4} y2="290" {...thin} />
      ))}
      {[0, 2, 3, 5].map((i) => (
        <circle key={i} cx={220.7 + i * 17.4} cy="276" r="3.6" fill={brass} />
      ))}
      <path d="M96 294 C 96 346, 182 346, 182 298" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <line x1="139" y1="334" x2="139" y2="346" stroke={ink} strokeWidth="3" />
      <circle cx="139" cy="356" r="11" fill={paper} {...line} />
      <circle cx="139" cy="356" r="5" fill={brassLight} />
    </Room>
  ),

  recovery: () => (
    <Room>
      <polygon points="70,372 340,372 300,318 110,318" fill={brassLight} fillOpacity="0.55" {...thin} />
      <line x1="62" y1="214" x2="338" y2="214" stroke={ink} strokeWidth="6" strokeLinecap="round" />
      <line x1="62" y1="214" x2="338" y2="214" stroke={paper} strokeWidth="2" strokeLinecap="round" />
      {[78, 322].map((x) => (
        <g key={x}>
          <line x1={x} y1="214" x2={x} y2="334" stroke={ink} strokeWidth="5" strokeLinecap="round" />
          <rect x={x - 12} y="332" width="24" height="6" rx="2" fill={ink} />
        </g>
      ))}
      <path d="M118 216 h38 v46 l-6 -6 l-6 6 l-6 -6 l-7 6 l-6 -6 l-7 6 z" fill={paper} {...thin} />
      <path d="M248 336 L 280 214 q 5 -18 22 -12" fill="none" stroke={brass} strokeWidth="6" strokeLinecap="round" />
      <path d="M248 336 L 280 214 q 5 -18 22 -12" fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="160" cy="344" rx="24" ry="9" fill={brass} {...thin} />
      <ellipse cx="196" cy="352" rx="24" ry="9" fill={brass} {...thin} />
      <path d="M146 342 q14 -12 28 0 M182 350 q14 -12 28 0" fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
    </Room>
  ),

  room: () => (
    <Room>
      <polygon points="64,300 170,300 210,370 92,370" fill={paper} fillOpacity="0.5" />
      <rect x="62" y="96" width="110" height="128" rx="3" fill={cream} {...line} />
      <line x1="117" y1="96" x2="117" y2="224" {...thin} />
      <line x1="62" y1="160" x2="172" y2="160" {...thin} />
      <path d="M58 92 q14 70 0 138 M176 92 q-14 70 0 138" fill="none" stroke={brass} strokeWidth="3" strokeLinecap="round" />
      <rect x="160" y="196" width="186" height="78" rx="12" fill={brassLight} {...line} />
      <rect x="152" y="254" width="208" height="34" rx="6" fill={paper} {...line} />
      <rect x="168" y="236" width="70" height="24" rx="11" fill={paper} {...line} />
      <rect x="262" y="246" width="86" height="22" rx="4" fill={brass} fillOpacity="0.8" {...line} />
      <line x1="270" y1="257" x2="340" y2="257" stroke={paper} strokeOpacity="0.6" strokeWidth="1.4" />
      <line x1="160" y1="288" x2="160" y2="334" {...line} />
      <line x1="352" y1="288" x2="352" y2="334" {...line} />
      <rect x="92" y="252" width="50" height="62" rx="3" fill={paper} {...line} />
      <line x1="92" y1="276" x2="142" y2="276" {...thin} />
      <rect x="104" y="220" width="24" height="30" rx="2" fill={cream} stroke={brass} strokeWidth="2.4" />
      <circle cx="116" cy="231" r="5" fill={leaf} fillOpacity="0.6" />
      <path d="M108 246 q8 -9 16 0" fill={leaf} fillOpacity="0.6" />
    </Room>
  ),

  meal: () => (
    <>
      <rect width="400" height="400" fill={mist} />
      <circle cx="200" cy="205" r="136" fill={cream} stroke={brassLight} strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      <circle cx="200" cy="200" r="118" fill={paper} {...line} />
      <circle cx="200" cy="200" r="106" fill="none" stroke={leaf} strokeOpacity="0.35" strokeWidth="1.4" />
      <circle cx="150" cy="140" r="27" fill={paper} {...line} />
      <circle cx="150" cy="140" r="20" fill={brass} fillOpacity="0.85" />
      <circle cx="214" cy="122" r="27" fill={paper} {...line} />
      <circle cx="214" cy="122" r="20" fill={leaf} fillOpacity="0.55" />
      <circle cx="268" cy="160" r="23" fill={paper} {...line} />
      <circle cx="268" cy="160" r="16" fill={paper} stroke={leaf} strokeWidth="1.4" />
      <path d="M134 216 c 0 -26 60 -30 66 -4 c 6 22 -10 40 -34 38 c -22 -2 -32 -14 -32 -34 z" fill={cream} {...line} />
      {[[150, 214], [164, 226], [176, 212], [182, 232], [160, 238]].map(([x, y]) => (
        <path key={`${x}${y}`} d={`M${x} ${y} l6 2`} stroke={ink} strokeOpacity="0.3" strokeWidth="1.4" strokeLinecap="round" />
      ))}
      <circle cx="248" cy="246" r="34" fill={brassLight} {...line} />
      <circle cx="232" cy="236" r="34" fill={brassLight} {...line} />
      {[[222, 228], [240, 244], [228, 250], [246, 226]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.4" fill={brass} />
      ))}
      <path d="M354 120 v150" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="354" cy="110" rx="9" ry="14" fill={paper} {...line} />
      <circle cx="74" cy="306" r="24" fill={paper} {...line} />
      <circle cx="74" cy="306" r="17" fill={leaf} fillOpacity="0.2" />
    </>
  ),

  daily: () => (
    <Room>
      <path d="M36 96 Q 200 128 364 96" fill="none" {...line} />
      <path d="M98 104 h52 v62 l-8 -6 l-9 6 l-9 -6 l-9 6 l-9 -6 l-8 6 z" fill={paper} {...line} />
      <path d="M220 112 h58 v48 h-58 z" fill={brassLight} {...line} />
      <line x1="220" y1="124" x2="278" y2="124" stroke={ink} strokeOpacity="0.35" strokeWidth="1.2" />
      {[106, 142, 228, 270].map((x) => (
        <rect key={x} x={x - 3} y={x < 200 ? 96 : 104} width="6" height="14" rx="1.5" fill={brass} {...thin} />
      ))}
      <rect x="66" y="294" width="268" height="12" rx="3" fill={brassLight} {...line} />
      {[
        { y: 268, h: 26, f: paper, w: 140 },
        { y: 244, h: 24, f: brassLight, w: 132 },
        { y: 222, h: 22, f: leaf, w: 124, o: 0.45 },
        { y: 202, h: 20, f: paper, w: 116 },
      ].map((t) => (
        <g key={t.y}>
          <rect x={196 - t.w / 2} y={t.y} width={t.w} height={t.h} rx="6" fill={t.f} fillOpacity={t.o ?? 1} {...line} />
          <line x1={196 - t.w / 2 + 12} y1={t.y + t.h / 2} x2={196 + t.w / 2 - 12} y2={t.y + t.h / 2} stroke={ink} strokeOpacity="0.25" strokeWidth="1.2" />
        </g>
      ))}
      <path d="M286 294 l5 -26 h30 l5 26 z" fill={brass} {...thin} />
      <Leaves cx={306} cy={268} n={5} r={14} />
    </Room>
  ),

  festival: () => {
    const pts = Array.from({ length: 19 }, (_, i) => {
      const t = i / 18;
      const x = (1 - t) ** 2 * 24 + 2 * (1 - t) * t * 200 + t ** 2 * 376;
      const y = (1 - t) ** 2 * 70 + 2 * (1 - t) * t * 168 + t ** 2 * 70;
      return [x, y];
    });
    return (
      <Room>
        <path d="M24 70 Q 200 168 376 70" fill="none" stroke={leaf} strokeWidth="1.6" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="9" fill={i % 2 ? brassLight : brass} {...thin} />
        ))}
        {[96, 304].map((x) => (
          <g key={x}>
            <line x1={x} y1={x < 200 ? 100 : 100} x2={x} y2="150" stroke={leaf} strokeWidth="1.4" />
            {[0, 1, 2].map((k) => <circle key={k} cx={x} cy={128 + k * 14} r="7" fill={k % 2 ? brass : brassLight} {...thin} />)}
          </g>
        ))}
        <circle cx="200" cy="336" r="54" fill={paper} fillOpacity="0.6" {...thin} />
        <circle cx="200" cy="336" r="36" fill="none" stroke={brass} strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="200" cy="312" rx="6" ry="12" fill={leaf} fillOpacity="0.55" transform={`rotate(${i * 45} 200 336)`} />
        ))}
        <circle cx="200" cy="336" r="9" fill={brass} />
        {[96, 140, 260, 304].map((x, i) => (
          <g key={x} transform={`translate(${x} ${i === 0 || i === 3 ? 268 : 256})`}>
            <path d="M-20 0 q20 22 40 0 z" fill={brass} {...line} />
            <path d="M0 -3 c-9 -8 -6 -20 0 -28 c6 8 9 20 0 28 z" fill={brassLight} {...thin} />
            <path d="M0 -7 c-3 -4 -2 -10 0 -13 c2 3 3 9 0 13 z" fill={brass} />
            <circle cx="0" cy="-26" r="10" fill={brassLight} fillOpacity="0.25" />
          </g>
        ))}
      </Room>
    );
  },

  gate: () => (
    <Room>
      <rect x="54" y="128" width="292" height="172" fill={cream} {...line} />
      <path d="M44 128 h312 l-18 -26 h-276 z" fill={brassLight} {...line} />
      {[80, 280].map((x) => (
        <g key={x}>
          <rect x={x} y="150" width="40" height="44" rx="2" fill={paper} {...line} />
          <line x1={x + 20} y1="150" x2={x + 20} y2="194" {...thin} />
        </g>
      ))}
      <rect x="128" y="198" width="22" height="104" fill={paper} {...line} />
      <rect x="250" y="198" width="22" height="104" fill={paper} {...line} />
      <rect x="124" y="192" width="30" height="8" fill={brassLight} {...thin} />
      <rect x="246" y="192" width="30" height="8" fill={brassLight} {...thin} />
      <line x1="150" y1="228" x2="250" y2="228" {...line} />
      <line x1="150" y1="294" x2="250" y2="294" {...line} />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={160 + i * 11.5} y1="222" x2={160 + i * 11.5} y2="294" {...thin} />
      ))}
      <path d="M150 228 q50 -26 100 0" fill="none" {...line} />
      <rect x="66" y="222" width="50" height="24" rx="1" fill={cream} stroke={brass} strokeWidth="2" />
      <rect x="70" y="226" width="42" height="16" fill="none" stroke={brass} strokeWidth="1" />
      <line x1="78" y1="234" x2="104" y2="234" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      {[[300, 118, 30], [334, 138, 22], [276, 104, 18]].map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} fill={leaf} fillOpacity="0.55" />
      ))}
      {[[292, 110], [312, 124], [330, 136], [300, 132], [282, 100], [340, 146], [318, 108]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4.5" fill={brass} />
      ))}
      <path d="M60 300 q10 -30 34 -30 q-4 18 -14 30 z" fill={leaf} fillOpacity="0.6" {...thin} />
    </Room>
  ),
};

export function Illustration({ scene, className, label }: { scene: Scene; className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={label ?? sceneDescriptions[scene]}
      focusable="false"
    >
      {scenes[scene]()}
    </svg>
  );
}
