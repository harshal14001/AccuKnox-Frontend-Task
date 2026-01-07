import React, { useState } from "react";
import dataFile from "../../data/dashboardData.json";
import AddWidgetDrawer from "./AddWidgetDrawer";
import { X, Plus } from "lucide-react";
import "./Opdb.css";
import {
  ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip
} from "recharts";

const Opdb = ({ searchQuery }) => {
  const [widgets, setWidgets] = useState(dataFile);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Remove Logic
  const removeWidget = (category, widgetId) => {
    setWidgets(prev => ({
      ...prev,
      [category]: prev[category].filter(w => w.id !== widgetId)
    }));
  };

  // Add Logic
  const handleConfirmWidgets = (newWidgetState) => {
    setWidgets(newWidgetState);
    setIsDrawerOpen(false);
  };

  // --- Render Helpers ---
  const renderPie = (widget) => {
    const data = widget.data || [];
    const colors = widget.colors || [];
    const total = data.reduce((acc, cur) => acc + (cur.value || 0), 0);
    return (
      <div className="chart-row">
        <div className="chart-area">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={0}>
                {data.map((entry, i) => <Cell key={i} fill={colors[i] || "#ccc"} />)}
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
              <span className="legend-dot" style={{ background: colors[i] }} /> 
              {d.name} ({d.value})
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderLine = (widget) => (
    // Height is set to 210px as requested (approx +15%)
    <div style={{width: '100%', height: 210, marginTop: 10}}>
       <ResponsiveContainer width="100%" height="100%">
         <LineChart data={widget.graphData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
            <Tooltip contentStyle={{borderRadius:'8px', border:'none', boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}} />
            <Line type="monotone" dataKey="findings" stroke="#4F46E5" strokeWidth={3} dot={{fill:'white', stroke:'#4F46E5', strokeWidth:2, r:4}} activeDot={{r:6}} />
         </LineChart>
       </ResponsiveContainer>
    </div>
  );

  return (
    <section className="opdb-main">
      
      {/* Header Section */}
      <div className="header-section">
         <h2>CNAPP Dashboard</h2>
         <button className="add-widget-btn" onClick={() => setIsDrawerOpen(true)}>
            Add Widget <Plus size={16} />
         </button>
      </div>

      {Object.entries(widgets).map(([category, widgetList]) => (
        <div key={category} className="category-section">
          <h3>{category}</h3>
          
          {/* Grid Layout: Adds 'full-width' class if it is Registry Scan */}
          <div className={`widget-grid ${category === "Registry Scan" ? "full-width" : ""}`}>
            
            {widgetList
              .filter(w => w.title.toLowerCase().includes(searchQuery?.toLowerCase() || ""))
              .map((widget) => (
              <div className="widget" key={widget.id}>
                <div className="widget-header">
                   <h4 className="widget-title">{widget.title}</h4>
                   <button className="remove-btn" onClick={() => removeWidget(category, widget.id)}>
                      <X size={16} />
                   </button>
                </div>
                
                <div className="widget-content">
                   {widget.type === 'pie' && renderPie(widget)}
                   {widget.type === 'line' && renderLine(widget)}
                   {(widget.type === 'text' || widget.type === 'bar') && 
                      <p className="widget-text">{widget.text}</p>
                   }
                </div>
              </div>
            ))}
            
            {/* Logic Fix: Only show "Add Widget" card if:
                1. Category is NOT Registry Scan
                2. Search Query is EMPTY (!searchQuery) 
            */}
            {category !== "Registry Scan" && !searchQuery && (
                <div className="widget add-widget" onClick={() => setIsDrawerOpen(true)}>
                  + Add Widget
                </div>
            )}

          </div>
        </div>
      ))}

      <AddWidgetDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        categories={dataFile} 
        activeWidgets={widgets} 
        confirmUpdates={handleConfirmWidgets}
      />
    </section>
  );
};

export default Opdb;