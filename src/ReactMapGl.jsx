import * as React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { useGetLocations } from "./query/getlocationHook";

import MapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import Pins from "./components/pins";

import CITIES from "./cities.json";

const TOKEN = process.env.REACT_APP_MAPBOX_KEY; // Set your mapbox token here

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};

function ReactMap() {
  const { data: locations, isSuccess } = useGetLocations();

  const [viewport, setViewport] = useState({
    latitude: 7.5177,
    longitude: 4.530315,
    zoom: 14.5,
    bearing: 0,
    pitch: 2.5,
  });

  return (
    <>
      <Navbar />

      <MapGL
        {...viewport}
        width="100%"
        height="100vh"
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}
      >
        {isSuccess && <Pins data={CITIES} locations={locations?.location} />}

        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>
    </>
  );
}

export default ReactMap;
