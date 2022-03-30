import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {MapAccessToken, MapStyles} from '../../constants/constants';

mapboxgl.accessToken = MapAccessToken;

function Map(props) {
    let map;
    const layerId = 'countries';

    let mapStyles = MapStyles.Streets;

    function changeMapStyles(newStyles) {
        if (mapStyles === newStyles) {
            return;
        }

        mapStyles = newStyles;
        map.setStyle(newStyles);

        map.on('style.load', function () {
            addLayer();
        });
    }

    function addLayer() {
        map.addLayer({
            id: layerId,
            source: {
                type: 'vector',
                url: 'mapbox://byfrost-articles.74qv0xp0',
            },
            'source-layer': 'ne_10m_admin_0_countries-76t9ly',
            type: 'fill',
            paint: {
                'fill-color': 'rgba( 21, 209, 4, .35)',
                'fill-outline-color': 'rgba( 21, 209, 4, .35)',
            },
        });
        map.setFilter('countries', ['in', 'ADM0_A3_IS', props.countryCode]);
    }

    function changeLayerVisibility(isVisible) {
        const visibility = map.getLayoutProperty(
            layerId,
            'visibility'
        );

        isVisible ? map.setLayoutProperty(layerId, 'visibility', 'visible') :
            map.setLayoutProperty(layerId, 'visibility', 'none');
        // map.on('idle', () => {
        //     if (!map.getLayer(layerId)) {
        //         return;
        //     }
        //     const visibility = map.getLayoutProperty(
        //         layerId,
        //         'visibility'
        //     );
        //
        //     isVisible ? map.setLayoutProperty(layerId, 'visibility', 'visible') :
        //         map.setLayoutProperty(layerId, 'visibility', 'none');
        // });
    }

    const description = '<h1>Some description</h1>'
    function showHotelsMarkers() {
        const hotels = [{
            name: 'First Hotel',
            lng: 12.55472,
            lat: 55.665957,
        },
            {
                name: 'First Hotel',
                lng: 14.55472,
                lat: 57.665957,
            }];

        hotels.map((hotel) => {
            const popup = new mapboxgl.Popup()
                .setLngLat({lng: hotel.lng, lat: hotel.lat})
                .setHTML(description);

            new mapboxgl.Marker({ color: 'orange'}).setLngLat({lng: hotel.lng, lat: hotel.lat}).setPopup(popup).addTo(map);
        })
    }

    const mapContainerRef = useRef(null);
    useEffect(() => {
        map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: mapStyles,
            center: props.center,
            zoom: 3.2,
            minZoom: 2,
        });

        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        map.addControl(new mapboxgl.FullscreenControl());
        map.on('load', function () {
            map.addLayer({
                id: layerId,
                source: {
                    type: 'vector',
                    url: 'mapbox://byfrost-articles.74qv0xp0',
                },
                'source-layer': 'ne_10m_admin_0_countries-76t9ly',
                type: 'fill',
                paint: {
                    'fill-color': 'rgba( 21, 209, 4, .35)',
                    'fill-outline-color': 'rgba( 21, 209, 4, .35)',
                },
            });
            new mapboxgl.Marker().setLngLat(props.center).addTo(map);

            map.setFilter('countries', ['in', 'ADM0_A3_IS', props.countryCode]);
        });
        return () => map.remove();
    }, [props.countryCode, props.center]);

    const btn = {
        width: '50px',
        height: '50px'
    };

    return <>
        <div className="map-container" ref={mapContainerRef}/>
        <button style={btn} onClick={() => changeMapStyles(MapStyles.Satellite)}>Satellight</button>
        <button style={btn} onClick={() => changeMapStyles(MapStyles.Light)}>Light</button>
        <button style={btn} onClick={() => changeMapStyles(MapStyles.Streets)}>Streets</button>
        <button style={btn} onClick={() => changeLayerVisibility(true)}>V</button>
        <button style={btn} onClick={() => changeLayerVisibility(false)}>N</button>
        <button style={btn} onClick={() => showHotelsMarkers()}>Hotels</button>
    </>;
}

export default Map;
