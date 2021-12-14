import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import Tooltip from "./components/Tooltip";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import { useGetLocations } from "./query/getlocationHook";

// import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const [lng, setLng] = useState(4.530315);
  const [lat, setLat] = useState(7.5177);
  const [zoom, setZoom] = useState(15);
  const [sty, setSty] = useState("satellite-v9");

  const { data: locations, isSuccess } = useGetLocations();
  // Initialize map when component mounts

  useEffect(() => {
    if (isSuccess) {
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

      // locations?.location?.map((item) => {
      //   return new mapboxgl.Marker()
      //     .setLngLat([item.longitude, item.latitude])
      //     .setPopup(new mapboxgl.Popup({ offset: 30 }))
      //     .addTo(map);
      // });

      new mapboxgl.Marker()
        .setLngLat([
          locations?.location[`${locations?.location?.length - 1}`]?.longitude,
          locations?.location[`${locations?.location?.length - 1}`]?.latitude,
        ])
        .setPopup(new mapboxgl.Popup({ offset: 30 }))
        .addTo(map);

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
    }
  }, [sty, isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

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
