import { useRef, useState } from "react";

function LineChart() {
  const wrapperRef = useRef(null);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    value: "",
    color: "",
  });

  const showTooltip = (e, payload) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTooltip({
      visible: true,
      x,
      y,
      ...payload,
    });
  };

  const moveTooltip = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }));
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const data = [
    { day: "D1", txns: 10, amount: 20000 },
    { day: "D2", txns: 20, amount: 30000 },
    { day: "D3", txns: 30, amount: 40000 },
    { day: "D4", txns: 50, amount: 70000 },
    { day: "D5", txns: 40, amount: 60000 },
    { day: "D6", txns: 60, amount: 80000 },
    { day: "D7", txns: 100, amount: 90000 },
  ];

  const SVG_WIDTH = 900;
  const SVG_HEIGHT = 520;

  const chart = {
    left: 90,
    right: 810,
    top: 70,
    bottom: 450,
  };

  const plotWidth = chart.right - chart.left; // 720
  const plotHeight = chart.bottom - chart.top; // 380

  // Transactions axis (left)
  const txMin = 0;
  const rawTxMax = Math.max(...data.map((d) => d.txns));
  const txMax = Math.ceil(rawTxMax / 10) * 10 || 10; // round to nearest 10

  // Amount axis (right)
  const amtMin = 0;
  const rawAmtMax = Math.max(...data.map((d) => d.amount));
  const amtMax = Math.ceil((rawAmtMax * 1.1) / 10000) * 10000 || 10000; // add 10% padding & round to 10k

  const yTickCount = 6; // like 0,20,40,60,80,100

  const xStep = data.length > 1 ? plotWidth / (data.length - 1) : 0;

  const getX = (i) => chart.left + i * xStep;

  const getYForTxns = (txns) => {
    const ratio = (txns - txMin) / (txMax - txMin); // 0..1
    return chart.bottom - ratio * plotHeight;
  };

  const getYForAmount = (amount) => {
    const ratio = (amount - amtMin) / (amtMax - amtMin); // 0..1
    return chart.bottom - ratio * plotHeight;
  };

  const txTickValues = Array.from({ length: yTickCount }, (_, idx) => {
    return txMin + (idx * (txMax - txMin)) / (yTickCount - 1);
  });

  const amtTickValues = Array.from({ length: yTickCount }, (_, idx) => {
    return amtMin + (idx * (amtMax - amtMin)) / (yTickCount - 1);
  });

  const transactionsPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getYForTxns(d.txns)}`)
    .join(" ");

  const amountPath = data
    .map(
      (d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getYForAmount(d.amount)}`
    )
    .join(" ");

  // Formatting amounts in tooltip and axis
  const formatAmount = (value) => {
    if (value === 0) return "₹0";
    return `₹${Math.round(value / 1000)}k`;
  };

  return (
    <div ref={wrapperRef} className="m-4 p-4 border-4 relative max-w-225">
      {/* Tooltip overlay (HTML) */}
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 12,
            top: tooltip.y - 12,
            background: "rgba(17, 24, 39, 0.95)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            color: "#e2e8f0",
            padding: "10px 12px",
            borderRadius: 12,
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            pointerEvents: "none",
            minWidth: 150,
            transform: "translateY(-100%)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: tooltip.color,
                display: "inline-block",
              }}
            />
            <span style={{ fontWeight: 700 }}>{tooltip.title}</span>
          </div>
          <div style={{ color: "#cbd5e1" }}>{tooltip.value}</div>
        </div>
      )}

      {/* SVG */}
      <svg
        width="100%"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="block max-w-full"
      >
        {/* Background */}
        <rect
          x="0"
          y="0"
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          fill="#0b1020"
          rx="16"
        />

        {/* Gridlines */}
        <g opacity="0.25">
          {/* Horizontal gridlines (use tx ticks for y positions) */}
          {txTickValues.map((t) => {
            const y = getYForTxns(t);
            return (
              <line
                key={`h-${t}`}
                x1={chart.left}
                y1={y}
                x2={chart.right}
                y2={y}
                stroke="#94a3b8"
                strokeWidth="1"
              />
            );
          })}

          {/* Vertical gridlines (based on number of days) */}
          {data.map((_, i) => {
            const x = getX(i);
            return (
              <line
                key={`v-${i}`}
                x1={x}
                y1={chart.top}
                x2={x}
                y2={chart.bottom}
                stroke="#94a3b8"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* Axes */}
        <g>
          {/* X-axis */}
          <line
            x1={chart.left}
            y1={chart.bottom}
            x2={chart.right}
            y2={chart.bottom}
            stroke="#e2e8f0"
            strokeWidth="2"
          />
          {/* Left Y-axis */}
          <line
            x1={chart.left}
            y1={chart.top}
            x2={chart.left}
            y2={chart.bottom}
            stroke="#e2e8f0"
            strokeWidth="2"
          />
          {/* Right Y-axis */}
          <line
            x1={chart.right}
            y1={chart.top}
            x2={chart.right}
            y2={chart.bottom}
            stroke="#e2e8f0"
            strokeWidth="2"
          />
        </g>

        {/* Title */}
        <text
          x={chart.left}
          y="40"
          fill="#e2e8f0"
          fontSize="18"
          fontFamily="Inter, Arial, sans-serif"
          fontWeight="700"
        >
          Transactions vs Amount
        </text>

        {/* Axis labels */}
        <text
          x="30"
          y="260"
          fill="#cbd5e1"
          fontSize="14"
          fontFamily="Inter, Arial, sans-serif"
          transform="rotate(-90 30 260)"
          textAnchor="middle"
        >
          # Transactions
        </text>

        <text
          x="870"
          y="260"
          fill="#cbd5e1"
          fontSize="14"
          fontFamily="Inter, Arial, sans-serif"
          transform="rotate(90 870 260)"
          textAnchor="middle"
        >
          Amount (₹)
        </text>

        <text
          x={(chart.left + chart.right) / 2}
          y="500"
          fill="#cbd5e1"
          fontSize="14"
          fontFamily="Inter, Arial, sans-serif"
          textAnchor="middle"
        >
          Time (Days)
        </text>

        {/* Legend */}
        <g>
          <rect
            x="560"
            y="18"
            width="260"
            height="38"
            rx="10"
            fill="#111827"
            opacity="0.9"
          />
          <circle cx="585" cy="37" r="6" fill="#22c55e" />
          <text
            x="600"
            y="41"
            fill="#e2e8f0"
            fontSize="13"
            fontFamily="Inter, Arial, sans-serif"
          >
            Transactions
          </text>
          <circle cx="720" cy="37" r="6" fill="#60a5fa" />
          <text
            x="735"
            y="41"
            fill="#e2e8f0"
            fontSize="13"
            fontFamily="Inter, Arial, sans-serif"
          >
            Amount (₹)
          </text>
        </g>

        {/* Left Y ticks */}
        <g stroke="#e2e8f0" strokeWidth="2">
          {txTickValues.map((t) => {
            const y = getYForTxns(t);
            return (
              <line
                key={`ly-${t}`}
                x1={chart.left}
                y1={y}
                x2={chart.left - 10}
                y2={y}
              />
            );
          })}
        </g>

        <g fill="#cbd5e1" fontSize="12" fontFamily="Inter, Arial, sans-serif">
          {txTickValues.map((t) => {
            const y = getYForTxns(t);
            return (
              <text
                key={`lyt-${t}`}
                x={chart.left - 20}
                y={y + 4}
                textAnchor="end"
              >
                {Math.round(t)}
              </text>
            );
          })}
        </g>

        {/* Right Y ticks */}
        <g stroke="#e2e8f0" strokeWidth="2">
          {amtTickValues.map((a) => {
            const y = getYForAmount(a);
            return (
              <line
                key={`ry-${a}`}
                x1={chart.right}
                y1={y}
                x2={chart.right + 10}
                y2={y}
              />
            );
          })}
        </g>

        <g fill="#cbd5e1" fontSize="12" fontFamily="Inter, Arial, sans-serif">
          {amtTickValues.map((a) => {
            const y = getYForAmount(a);
            return (
              <text
                key={`ryt-${a}`}
                x={chart.right + 20}
                y={y + 4}
                textAnchor="start"
              >
                {formatAmount(Math.round(a))}
              </text>
            );
          })}
        </g>

        {/* X ticks */}
        <g stroke="#e2e8f0" strokeWidth="2">
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <line
                key={`xt-${d.day}`}
                x1={x}
                y1={chart.bottom}
                x2={x}
                y2={chart.bottom + 10}
              />
            );
          })}
        </g>

        {/* X labels */}
        <g fill="#cbd5e1" fontSize="12" fontFamily="Inter, Arial, sans-serif">
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <text
                key={`xl-${d.day}`}
                x={x}
                y={chart.bottom + 25}
                textAnchor="middle"
              >
                {d.day}
              </text>
            );
          })}
        </g>

        {/* Lines */}
        <path
          d={transactionsPath}
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d={amountPath}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {data.map((d, i) => {
          const x = getX(i);

          return (
            <g key={`pt-${d.day}`}>
              {/* Transactions point */}
              <circle
                cx={x}
                cy={getYForTxns(d.txns)}
                r="6"
                fill="#22c55e"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) =>
                  showTooltip(e, {
                    title: `${d.day} • Transactions`,
                    value: `${d.txns} txns`,
                    color: "#22c55e",
                  })
                }
                onMouseMove={moveTooltip}
                onMouseLeave={hideTooltip}
              />

              {/* Amount point */}
              <circle
                cx={x}
                cy={getYForAmount(d.amount)}
                r="6"
                fill="#60a5fa"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) =>
                  showTooltip(e, {
                    title: `${d.day} • Amount`,
                    value: formatAmount(d.amount),
                    color: "#60a5fa",
                  })
                }
                onMouseMove={moveTooltip}
                onMouseLeave={hideTooltip}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default LineChart;
