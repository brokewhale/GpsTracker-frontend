import React from "react";
import Map from "./Map";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactMap from "./ReactMapGl";
import GoogleMap from "./GoogleMap";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/map-gl" element={<ReactMap />} />
            <Route path="/google" element={<GoogleMap />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
