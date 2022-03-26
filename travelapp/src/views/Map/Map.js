import React, {useRef, useEffect} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import "./map.scss";

// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken =
    "pk.eyJ1IjoieXVyYTI1MDY5MSIsImEiOiJja203emdiMjIxMnVxMm9tdGxlcDRkZXpyIn0.MBn74R_hf0eodqa26JqMHg";

function Map(props) {

    const mapContainerRef = useRef(null);
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/light-v9",
            center: props.center,
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
            new mapboxgl.Marker().setLngLat(props.center).addTo(map);

            map.setFilter("countries", ["in", "ADM0_A3_IS", props.countryCode]);
        });
        return () => map.remove();
    }, [props.countryCode, props.center]);

    return <div className="map-container" ref={mapContainerRef}/>;
}

export default Map;
