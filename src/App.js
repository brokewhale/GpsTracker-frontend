import React from "react";
import Map from "./Map";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactMapGl from "./ReactMapGl";
import GoogleMap from "./GoogleMap";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/map-gl" element={<ReactMapGl />} />
          <Route path="/google" element={<GoogleMap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
