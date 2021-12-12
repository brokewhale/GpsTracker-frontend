import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import Tooltip from "./components/Tooltip";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";

// import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const Map = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const [lng, setLng] = useState(4.530315);
  const [lat, setLat] = useState(7.5177);
  const [zoom, setZoom] = useState(15);
  const [sty, setSty] = useState("satellite-v9");

  const data = [
    {
      longitude: "4.530315",
      latitude: "7.5177",
      time: "2021-12-12T11:39:27.308Z",
      _id: "61b5e0d2b4b53c922f76379d",
    },
    {
      longitude: "4.530315",
      latitude: "7.5177",
      time: "2021-12-12T11:39:27.308Z",
      _id: "61b5e0d2b4b53c922f76379d",
    },
    {
      longitude: "4.5251",
      latitude: "7.5169",
      time: "2021-12-12T11:39:27.308Z",
      _id: "61b5e0fcb4b53c922f7637a1",
    },
    {
      longitude: "4.5131",
      latitude: "7.5149",
      time: "2021-12-12T11:39:27.308Z",
      _id: "61b5e0fcb4b53c922f7637a1",
    },
    {
      longitude: "4.5251",
      latitude: "7.5169",
      time: "2021-12-12T11:39:27.308Z",
      _id: "61b5e0fcb4b53c922f7637a1",
    },
  ];
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [4.530315, 7.5177],
      zoom: 15,
    });

    //change style
    map.setStyle("mapbox://styles/mapbox/" + sty);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    data.map((item) => {
      return new mapboxgl.Marker()
        .setLngLat([item.longitude, item.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 30 }))
        .addTo(map);
    });

    // change cursor to pointer when user hovers over a clickable feature
    map.on("mouseenter", (e) => {
      if (e.features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on("mouseleave", () => {
      map.getCanvas().style.cursor = "";
    });

    // add tooltip when users mouse move over a point
    map.on("mousemove", (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        // Create tooltip node
        const tooltipNode = document.createElement("div");
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, [sty]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeStyle = (value) => {
    setSty(value);
    // map.setStyle("mapbox://styles/mapbox/" + value);
  };
  return (
    <div>
      <Navbar />
      <div id="menu">
        <input
          id="satellite-v9"
          type="radio"
          name="rtoggle"
          value="satellite"
          // checked="checked"
          onClick={(e) => changeStyle(e.target.id)}
        />

        <label for="satellite-v9">satellite</label>
        <input
          id="light-v10"
          type="radio"
          name="rtoggle"
          value="light"
          onClick={(e) => changeStyle(e.target.id)}
        />
        <label for="light-v10">light</label>
        <input
          id="dark-v10"
          type="radio"
          name="rtoggle"
          value="dark"
          onClick={(e) => changeStyle(e.target.id)}
        />
        <label for="dark-v10">dark</label>
        <input
          id="streets-v11"
          type="radio"
          name="rtoggle"
          value="streets"
          onClick={(e) => changeStyle(e.target.id)}
        />
        <label for="streets-v11">streets</label>
        <input
          id="outdoors-v11"
          type="radio"
          name="rtoggle"
          value="outdoors"
          onClick={(e) => changeStyle(e.target.id)}
        />
        <label for="outdoors-v11">outdoors</label>
      </div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
