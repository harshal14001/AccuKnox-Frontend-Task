import React, { useState } from "react";
import { X } from "lucide-react";
import "./AddWidgetDrawer.css"; // We will add CSS for this below

const AddWidgetDrawer = ({ isOpen, onClose, categories, activeWidgets, confirmUpdates }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(categories)[0]); // Default to first tab
  
  // Local state to track checkboxes before confirming
  // We initialize this based on what is currently active in Opdb
  const [tempWidgets, setTempWidgets] = useState(activeWidgets);

  const toggleWidget = (category, widget) => {
    const currentList = tempWidgets[category] || [];
    const isPresent = currentList.find((w) => w.id === widget.id);

    let newList;
    if (isPresent) {
      // Remove it
      newList = currentList.filter((w) => w.id !== widget.id);
    } else {
      // Add it
      newList = [...currentList, widget];
    }

    setTempWidgets({ ...tempWidgets, [category]: newList });
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay">
      <div className="drawer-content">
        <div className="drawer-header">
          <h3>Add Widget</h3>
          <X onClick={onClose} cursor="pointer" />
        </div>
        
        <p className="drawer-subtitle">Personalise your dashboard by adding the following widget</p>

        {/* Tabs */}
        <div className="drawer-tabs">
          {Object.keys(categories).map((cat) => (
            <div 
              key={cat} 
              className={`tab ${activeTab === cat ? "active-tab" : ""}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat.split(" ")[0]} {/* Show short name like CSPM */}
            </div>
          ))}
        </div>

        {/* Widget List with Checkboxes */}
        <div className="drawer-body">
          {categories[activeTab]?.map((widget) => (
            <div key={widget.id} className="checkbox-row">
              <input
                type="checkbox"
                id={widget.id}
                // Check if this widget is in our temp state
                checked={!!tempWidgets[activeTab]?.find((w) => w.id === widget.id)}
                onChange={() => toggleWidget(activeTab, widget)}
              />
              <label htmlFor={widget.id}>{widget.title}</label>
            </div>
          ))}
        </div>

        <div className="drawer-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={() => confirmUpdates(tempWidgets)}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetDrawer;