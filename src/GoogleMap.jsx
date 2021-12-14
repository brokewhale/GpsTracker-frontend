import React from "react";
import GoogleMapReact from "google-map-react";
import Navbar from "./components/Navbar";
// import { withScriptjs, withGoogleMap } from "react-google-maps";
// import { ReactComponent as Satellite } from "./satellite-svgrepo-com.svg";
import { useGetLocations } from "./query/getlocationHook";

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
  const { data: locations, isSuccess } = useGetLocations();

  const defaultProps = {
    center: {
      lat: 7.5177,
      lng: 4.530315,
    },
    zoom: 11,
  };

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
          {/* {data.map((item) => ( */}
          {isSuccess && (
            <AnyReactComponent
              lng={locations[`${locations?.length - 1}`]?.longitude}
              lat={locations[`${locations?.length - 1}`]?.latitude}
              text=""
            />
          )}

          {/* ))} */}
        </GoogleMapReact>
      </div>
    </>
  );
}
