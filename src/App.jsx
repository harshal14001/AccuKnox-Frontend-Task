import React, { useState } from "react";
import Nav from "./components/Navbar/Nav";
import Opdb from "./components/Operational-Dashb/Opdb";

const App = () => {
  // State for Search Query
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      {/* Pass the setter to Nav */}
      <Nav setSearchQuery={setSearchQuery} />
      
      {/* Pass the value to Opdb */}
      <Opdb searchQuery={searchQuery} />
    </div>
  );
};

export default App;