import React from "react";
import GoogleMapReact from "google-map-react";
import Navbar from "./components/Navbar";
// import { withScriptjs, withGoogleMap } from "react-google-maps";
// import { ReactComponent as Satellite } from "./satellite-svgrepo-com.svg";

const AnyReactComponent = ({ text }) => (
  <div
    className="marker-pointer"
    onClick={() => {
      let url = `https://xchange-react.vercel.app`;

      window.open(url, "_self");
    }}
  >
    {text}
  </div>
);

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 7.5177,
      lng: 4.530315,
    },
    zoom: 11,
  };

  const data = [
    {
      longitude: "4.530315",
      latitude: "7.5177",
      time: "2021-12-12T11:39:27.308Z",
      _id: "61b5e0d2b4b53c922f76379d",
    },
    {
      longitude: "4.530215",
      latitude: "7.5077",
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
  return (
    <>
      {/* Important! Always set the container height explicitly */}
      <div style={{ height: "100vh", width: "100%" }}>
        <Navbar />
        <GoogleMapReact
          // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {/* <Marker position={{ lat: 7.5177, lng: 4.530315 }} /> */}
          {data.map((item) => (
            <AnyReactComponent
              lat={item.latitude}
              lng={item.longitude}
              text=""
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
}
