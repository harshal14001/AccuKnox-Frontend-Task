import React, { useState } from "react";
import dataFile from "../../data/dashboardData.json";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "./Opdb.css";

const Opdb = () => {
  const [widgets, setWidgets] = useState(dataFile);

  const addWidget = () => {
    const widgetName = prompt("Enter Widget Name:");
    const widgetText = prompt("Enter Widget Text:");
    if (!widgetName) return;
    const newWidget = {
      id: Date.now().toString(),
      title: widgetName,
      type: "text",
      text: widgetText,
      data: [],
      colors: []
    };
    setWidgets((s) => [...s, newWidget]);
  };

  const renderPie = (widget) => {
    const data = widget.data || [];
    const colors = widget.colors || [];
    const total = data.reduce((acc, cur) => acc + (cur.value || 0), 0);

    return (
      <div className="chart-row">
        <div className="chart-area">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={44}
                outerRadius={64}
                paddingAngle={3}
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={colors[i] || "#d1d5db"} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-center">
            <div className="chart-total">{total}</div>
            <div className="chart-label">Total</div>
          </div>
        </div>

        <ul className="legend">
          {data.map((d, i) => (
            <li key={i}>
              <span
                className="legend-dot"
                style={{ background: colors[i] || "#d1d5db" }}
              />
              <span className="legend-text">
                {d.name} ({d.value})
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="opdb-main">
      <h2>CNAPP Dashboard</h2>

      {/* CSPM Section */}
      <h3 className="cspm">CSPM Executive Dashboard</h3>
      <div className="widget-grid">
        {widgets.map((w, idx) => (
          <div className="widget" key={w.id ?? idx}>
            <div className="widget-title">{w.title}</div>

            {w.type === "pie" ? (
              renderPie(w)
            ) : (
              <div className="widget-content">
                {w.text ? (
                  <p className="widget-text">{w.text}</p>
                ) : (
                  <p className="widget-placeholder">
                    No Graph data available!
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="widget add-widget" onClick={addWidget}>
          + Add Widget
        </div>
      </div>

      {/* CWPP Section */}
      <h3 className="cwpp">CWPP Dashboard</h3>
      <div className="widget-grid">
        {/* Card 1 */}
        <div className="cwpp-card">
          <h4 className="cwpp-title">About Developer</h4>
          <p className="cwpp-text">
            Hello! folks myself Harshal Argade and I am Full Stack Web Developer.         
            </p>
            <span className="cwpp-span">Contact: harshalargade.dev@gmail.com
          </span>
        </div>

        {/* Card 2 */}
        <div className="cwpp-card">
          <h4 className="cwpp-title">Tech Stack</h4>
          <p className="cwpp-text">
            Skilled in React, Node.js, MongoDB, Express and other trending technologies for building scalable web applications.
          </p>
        </div>

        {/* Empty (Add Widget style) */}
        <div className="widget add-widget">
          + Add Widget
        </div>
      </div>
    </section>
  );
};

export default Opdb;
