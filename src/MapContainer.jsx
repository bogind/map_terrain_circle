import { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import './map.css';

import { onMapLoad, style } from './MainMap';

export default function MapContainer(props) {
  const {mapCenter,mapZoom,baseHeight,topHeight} = props;
  const containerRef = useRef(null);
  const mapRef = useRef(null);


  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new maplibregl.Map({
        style: style,
        container: containerRef.current,
        center: mapCenter, 
        zoom: mapZoom,
        attributionControl: false// starting zoom
      });

    mapRef.current.on('load',()=>{
      onMapLoad({
        map:mapRef.current,
        mapCenter:mapCenter,
        baseHeight:baseHeight,
        topHeight:topHeight
      })
    })
    

  });

  

  return (
    <div className="map-wrap">
     <div ref={containerRef} className="map" />
  </div>
  );
}