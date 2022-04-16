import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {MapAccessToken, MapStyles} from '../../constants/constants';
import DataService from "../../services/DataService";

mapboxgl.accessToken = MapAccessToken;

function Map(props) {
    let map;
    const layerId = 'countries';
    const hotelMarkers = [];
    const dataService = new DataService();

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

    function createHotelPopup(hotelData) {
        return `<a href=${hotelData.link} target="_blank">` +
            '<div class="infowindow">' +
            '<div>' +
            `<img class="hotel" src=${hotelData.image}>` +
            '</img>' +
            `<h4 class="hotel_name">${hotelData.name}</h4>` +
            ' <div class="hotel_rating">\n' +
            '                <ul style={ul}>\n' +
            `                    ${hotelData.rating >= 1 ? '<li class="star">&#9733;</li>\n' : ''}` +
            `                    ${hotelData.rating >= 2 ? '<li class="star">&#9733;</li>\n' : ''}` +
            `                    ${hotelData.rating >= 3 ? '<li class="star">&#9733;</li>\n' : ''}` +
            `                    ${hotelData.rating >= 4 ? '<li class="star">&#9733;</li>\n' : ''}` +
            `                    ${hotelData.rating >= 5 ? '<li class="star">&#9733;</li>\n' : ''}` +
            '                </ul>\n' +
            '            </div>' +
            '</div>' +
            '<h5 class="modal_footer">Visit site</h5>' +
            '</a>' +
            '</div>'
    }

    function showHotelsMarkers(hotels) {
        // const hotels = [{
        //     name: 'Grand Hotel Union',
        //     lng: 12.55472,
        //     lat: 55.665957,
        //     rating: 4,
        //     image: 'https://alexander0152.github.io/travelData/assets/Hotels/Grand_Hotel_Union.jpg',
        //     link: 'https://www.uhcollection.si/grand-hotel-union'
        // }

        map.on('dragend', (e) => {
            removeHotelMarkers();
            const n = dataService.getHotels(props.countryCode, map.getCenter());
            dataService.getHotels(props.countryCode, map.getCenter()).then((hotels) => {
                hotels?.map((hotel) => {
                    const popup = new mapboxgl.Popup()
                        .setLngLat({lng: hotel.longitude, lat: hotel.latitude})
                        .setHTML(createHotelPopup(hotel));

                    const hotelMarker = new mapboxgl.Marker({color: 'orange'}).setLngLat({
                        lng: hotel.longitude,
                        lat: hotel.latitude
                    }).setPopup(popup).addTo(map);

                    hotelMarkers.push(hotelMarker);
                })
            });
        });
    }

    function removeHotelMarkers() {
        hotelMarkers.map((marker) => {
            marker.remove();
        });
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
