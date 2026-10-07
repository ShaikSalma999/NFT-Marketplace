import { useRef, useState } from "react";
import { ethPrice } from "../data";

const MAX_PRICE = 350;   
const BASELINE = 280;    

const toY = (price) => 300 - (price / MAX_PRICE) * 300;
const pts = ethPrice.map((p) => ({ ...p, y: toY(p.price), t: new Date(p.time).getTime() }));
const first = pts[0];
const last = pts[pts.length - 1];

const linePoints = pts.map((p) => `${p.x},${p.y.toFixed(1)}`).join(" ");
const areaPath =
  `M${first.x} ${BASELINE} ` + pts.map((p) => `L${p.x} ${p.y.toFixed(1)}`).join(" ") + ` L${last.x} ${BASELINE} Z`;


function sampleAt(x) {
  const cx = Math.min(Math.max(x, first.x), last.x);
  const i = pts.findIndex((p, idx) => idx < pts.length - 1 && cx <= pts[idx + 1].x);
  const a = pts[i];
  const b = pts[i + 1];
  const k = (cx - a.x) / (b.x - a.x);
  return {
    x: cx,
    y: a.y + (b.y - a.y) * k,
    price: a.price + (b.price - a.price) * k,
    t: a.t + (b.t - a.t) * k,
  };
}

const formatTime = (t) =>
  new Date(t).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });

export default function EthPriceChart() {
  const boxRef = useRef(null);
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null);

  const handleMove = (e) => {
    const svg = svgRef.current;
    const box = boxRef.current;
    const ctm = svg && svg.getScreenCTM();
    if (!svg || !box || !ctm) return;

    
    const cursor = svg.createSVGPoint();
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    const local = cursor.matrixTransform(ctm.inverse());
    const s = sampleAt(local.x);

   
    const onLine = svg.createSVGPoint();
    onLine.x = s.x;
    onLine.y = s.y;
    const screen = onLine.matrixTransform(ctm);
    const rect = box.getBoundingClientRect();
    setHover({ ...s, left: screen.x - rect.left, top: screen.y - rect.top, width: rect.width });
  };

  const tipLeft = hover ? Math.min(Math.max(hover.left, 75), hover.width - 75) : 0;
  const tipTop = hover ? (hover.top < 78 ? hover.top + 16 : hover.top - 62) : 0;

  return (
    <div ref={boxRef} className="surface relative h-[248px] overflow-hidden p-4">
      <div className="absolute left-4 top-8 flex h-[170px] flex-col justify-between text-[10px] text-[#7048f4]/70">
        <span>350</span><span>300</span><span>250</span><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 620 300"
        role="img"
        aria-label="ETH price chart"
        className="ml-5 h-full w-[calc(100%-20px)] cursor-crosshair touch-pan-y"
        onPointerMove={handleMove}
        onPointerDown={handleMove}
        onPointerLeave={() => setHover(null)}
        onPointerCancel={() => setHover(null)}
      >
        <path d={areaPath} fill="rgba(112,72,244,.12)" />
        <polyline points={linePoints} fill="none" stroke="#7048f4" strokeWidth="4" />
        {pts.slice(0, 8).map((p) => <circle key={p.x} cx={p.x} cy={p.y} r="7" fill="#7048f4" />)}
        {hover && (
          <>
            <line x1={hover.x} x2={hover.x} y1="10" y2={BASELINE} stroke="#7048f4" strokeOpacity=".55" strokeDasharray="5 5" />
            <circle cx={hover.x} cy={hover.y} r="9" fill="#fff" stroke="#7048f4" strokeWidth="4" />
          </>
        )}
      </svg>
      {hover && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#272244] px-3 py-2 shadow-xl"
          style={{ left: tipLeft, top: tipTop }}
        >
          <p className="text-[11px] muted">{formatTime(hover.t)}</p>
          <p className="text-[14px] font-semibold">${hover.price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
