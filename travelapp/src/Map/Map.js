import React, { useRef, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { getLanguageFromState } from "../../redux/selectors";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Australia from "../ContryPages/Australia";
// import "./map.scss";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken =
  "pk.eyJ1IjoieXVyYTI1MDY5MSIsImEiOiJja203emdiMjIxMnVxMm9tdGxlcDRkZXpyIn0.MBn74R_hf0eodqa26JqMHg";

function Map({countryName}) {
//   const language = useSelector(getLanguageFromState);
  const relCountryCode = {
    France: "FRA",
    Australia: "AUS",
    Egypt: "EGY",
    Japan: "JPN",
    Switzerland: "CHE",
    Mexico: "MEX",
    USA: "USA",
    UK: "GBR",
  };
  const reCountryLngLtd = {
    France: [2.351556, 48.856663],
    Australia: [149.125529, -35.306904],
    Egypt: [31.2469, 30.050747],
    Japan: [139.753882, 35.6817],
    Switzerland: [7.440386, 46.947978],
    Mexico: [-99.133296, 19.432605],
    USA: [-77.036527, 38.899513],
    UK: [-0.12766, 51.507351],
  };
  
  const mapContainerRef = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v9",
      center: reCountryLngLtd[countryName],
      zoom: 3.2,
      minZoom: 2,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(new mapboxgl.FullscreenControl());
    map.on("load", function () {
      map.addLayer({
        id: "countries",
        source: {
          type: "vector",
          url: "mapbox://byfrost-articles.74qv0xp0",
        },
        "source-layer": "ne_10m_admin_0_countries-76t9ly",
        type: "fill",
        paint: {
          "fill-color": "rgba( 21, 209, 4, .35)",
          "fill-outline-color": "rgba( 21, 209, 4, .35)",
        },
      });
      map.getStyle().layers.forEach(function (thisLayer) {
        if (thisLayer.type == "symbol") {
          map.setLayoutProperty(thisLayer.id, "text-field", [
            "get",
            // `name_${language === "BE" ? "ru" : language.toLowerCase()}`,
          ]);
        }
      });
      new mapboxgl.Marker().setLngLat(reCountryLngLtd[countryName]).addTo(map);

      map.setFilter("countries", ["in", "ADM0_A3_IS", relCountryCode[countryName]]);
    });
    return () => map.remove();
  }, []);
  return <div className="map-container" ref={mapContainerRef} />;
}

export default Map;

// import * as React from 'react';
// import ReactMapGL from 'react-map-gl';
// import mapboxgl from "mapbox-gl";

// // mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// mapboxgl.accessToken =
//   "pk.eyJ1IjoieXVyYTI1MDY5MSIsImEiOiJja203emdiMjIxMnVxMm9tdGxlcDRkZXpyIn0.MBn74R_hf0eodqa26JqMHg";

// function Map() {
//   const [viewport, setViewport] = React.useState({
//     latitude: 37.7577,
//     longitude: -122.4376,
//     zoom: 8
//   });

//   return (
//     <ReactMapGL
//     accessToken = "pk.eyJ1IjoieXVyYTI1MDY5MSIsImEiOiJja203emdiMjIxMnVxMm9tdGxlcDRkZXpyIn0.MBn74R_hf0eodqa26JqMHg"
//       {...viewport}
//       width="500px"
//       height="500px"
//       onViewportChange={(viewport) => setViewport(viewport)}
//     />
//   );
// }
// export default Map;