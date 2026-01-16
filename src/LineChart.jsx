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
        viewBox="0 0 900 520"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="block max-w-full"
      >
        {/* Background */}
        <rect x="0" y="0" width="900" height="520" fill="#0b1020" rx="16" />

        {/* Gridlines */}
        <g opacity="0.25">
          <line
            x1="90"
            y1="450"
            x2="810"
            y2="450"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="90"
            y1="374"
            x2="810"
            y2="374"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="90"
            y1="298"
            x2="810"
            y2="298"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="90"
            y1="222"
            x2="810"
            y2="222"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="90"
            y1="146"
            x2="810"
            y2="146"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="90"
            y1="70"
            x2="810"
            y2="70"
            stroke="#94a3b8"
            strokeWidth="1"
          />

          <line
            x1="90"
            y1="70"
            x2="90"
            y2="450"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="210"
            y1="70"
            x2="210"
            y2="450"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="330"
            y1="70"
            x2="330"
            y2="450"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="450"
            y1="70"
            x2="450"
            y2="450"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="570"
            y1="70"
            x2="570"
            y2="450"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="690"
            y1="70"
            x2="690"
            y2="450"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <line
            x1="810"
            y1="70"
            x2="810"
            y2="450"
            stroke="#94a3b8"
            strokeWidth="1"
          />
        </g>

        {/* Axes */}
        <g>
          <line
            x1="90"
            y1="450"
            x2="810"
            y2="450"
            stroke="#e2e8f0"
            strokeWidth="2"
          />
          <line
            x1="90"
            y1="70"
            x2="90"
            y2="450"
            stroke="#e2e8f0"
            strokeWidth="2"
          />
          <line
            x1="810"
            y1="70"
            x2="810"
            y2="450"
            stroke="#e2e8f0"
            strokeWidth="2"
          />
        </g>

        {/* Title */}
        <text
          x="90"
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
          x="450"
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
          <line x1="90" y1="450" x2="80" y2="450" />
          <line x1="90" y1="374" x2="80" y2="374" />
          <line x1="90" y1="298" x2="80" y2="298" />
          <line x1="90" y1="222" x2="80" y2="222" />
          <line x1="90" y1="146" x2="80" y2="146" />
          <line x1="90" y1="70" x2="80" y2="70" />
        </g>
        <g fill="#cbd5e1" fontSize="12" fontFamily="Inter, Arial, sans-serif">
          <text x="70" y="454" textAnchor="end">
            0
          </text>
          <text x="70" y="378" textAnchor="end">
            20
          </text>
          <text x="70" y="302" textAnchor="end">
            40
          </text>
          <text x="70" y="226" textAnchor="end">
            60
          </text>
          <text x="70" y="150" textAnchor="end">
            80
          </text>
          <text x="70" y="74" textAnchor="end">
            100
          </text>
        </g>

        {/* Right Y ticks */}
        <g stroke="#e2e8f0" strokeWidth="2">
          <line x1="810" y1="450" x2="820" y2="450" />
          <line x1="810" y1="374" x2="820" y2="374" />
          <line x1="810" y1="298" x2="820" y2="298" />
          <line x1="810" y1="222" x2="820" y2="222" />
          <line x1="810" y1="146" x2="820" y2="146" />
          <line x1="810" y1="70" x2="820" y2="70" />
        </g>
        <g fill="#cbd5e1" fontSize="12" fontFamily="Inter, Arial, sans-serif">
          <text x="830" y="454" textAnchor="start">
            ₹0
          </text>
          <text x="830" y="378" textAnchor="start">
            ₹20k
          </text>
          <text x="830" y="302" textAnchor="start">
            ₹40k
          </text>
          <text x="830" y="226" textAnchor="start">
            ₹60k
          </text>
          <text x="830" y="150" textAnchor="start">
            ₹80k
          </text>
          <text x="830" y="74" textAnchor="start">
            ₹100k
          </text>
        </g>

        {/* X ticks */}
        <g stroke="#e2e8f0" strokeWidth="2">
          <line x1="90" y1="450" x2="90" y2="460" />
          <line x1="210" y1="450" x2="210" y2="460" />
          <line x1="330" y1="450" x2="330" y2="460" />
          <line x1="450" y1="450" x2="450" y2="460" />
          <line x1="570" y1="450" x2="570" y2="460" />
          <line x1="690" y1="450" x2="690" y2="460" />
          <line x1="810" y1="450" x2="810" y2="460" />
        </g>
        <g fill="#cbd5e1" fontSize="12" fontFamily="Inter, Arial, sans-serif">
          <text x="90" y="475" textAnchor="middle">
            D1
          </text>
          <text x="210" y="475" textAnchor="middle">
            D2
          </text>
          <text x="330" y="475" textAnchor="middle">
            D3
          </text>
          <text x="450" y="475" textAnchor="middle">
            D4
          </text>
          <text x="570" y="475" textAnchor="middle">
            D5
          </text>
          <text x="690" y="475" textAnchor="middle">
            D6
          </text>
          <text x="810" y="475" textAnchor="middle">
            D7
          </text>
        </g>

        {/* Lines */}
        <path
          d="M 90 412 L 210 374 L 330 336 L 450 260 L 570 298 L 690 222 L 810 184"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 90 374 L 210 336 L 330 298 L 450 184 L 570 222 L 690 146 L 810 108"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* --- ALL POINTS --- */}

        {/* Transactions points */}
        <circle
          cx="90"
          cy="412"
          r="6"
          fill="#22c55e"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D1 • Transactions",
              value: "10 txns",
              color: "#22c55e",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="210"
          cy="374"
          r="6"
          fill="#22c55e"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D2 • Transactions",
              value: "20 txns",
              color: "#22c55e",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="330"
          cy="336"
          r="6"
          fill="#22c55e"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D3 • Transactions",
              value: "30 txns",
              color: "#22c55e",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="450"
          cy="260"
          r="6"
          fill="#22c55e"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D4 • Transactions",
              value: "50 txns",
              color: "#22c55e",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="570"
          cy="298"
          r="6"
          fill="#22c55e"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D5 • Transactions",
              value: "40 txns",
              color: "#22c55e",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="690"
          cy="222"
          r="6"
          fill="#22c55e"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D6 • Transactions",
              value: "60 txns",
              color: "#22c55e",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="810"
          cy="184"
          r="6"
          fill="#22c55e"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D7 • Transactions",
              value: "70 txns",
              color: "#22c55e",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />

        {/* Amount points */}
        <circle
          cx="90"
          cy="374"
          r="6"
          fill="#60a5fa"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D1 • Amount",
              value: "₹20k",
              color: "#60a5fa",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="210"
          cy="336"
          r="6"
          fill="#60a5fa"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D2 • Amount",
              value: "₹30k",
              color: "#60a5fa",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="330"
          cy="298"
          r="6"
          fill="#60a5fa"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D3 • Amount",
              value: "₹40k",
              color: "#60a5fa",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="450"
          cy="184"
          r="6"
          fill="#60a5fa"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D4 • Amount",
              value: "₹70k",
              color: "#60a5fa",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="570"
          cy="222"
          r="6"
          fill="#60a5fa"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D5 • Amount",
              value: "₹60k",
              color: "#60a5fa",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="690"
          cy="146"
          r="6"
          fill="#60a5fa"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D6 • Amount",
              value: "₹80k",
              color: "#60a5fa",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
        <circle
          cx="810"
          cy="108"
          r="6"
          fill="#60a5fa"
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) =>
            showTooltip(e, {
              title: "D7 • Amount",
              value: "₹90k",
              color: "#60a5fa",
            })
          }
          onMouseMove={moveTooltip}
          onMouseLeave={hideTooltip}
        />
      </svg>
    </div>
  );
}

export default LineChart;
