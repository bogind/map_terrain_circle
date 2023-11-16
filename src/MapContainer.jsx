import { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import './map.css';

import { onMapLoad, style } from './MainMap';

export default function MapContainer(props) {
  const {mapCenter,setMapCenter,gj,setLayerData} = props;
  const containerRef = useRef(null);
  const mapRef = useRef(null);


  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new maplibregl.Map({
        style: style,
        container: containerRef.current,
        center: [10.20786,56.15890], 
        zoom: 9,
        attributionControl: false// starting zoom
      });


    onMapLoad({map:mapRef.current})

  });

  

  return (
    <div className="map-wrap">
     <div ref={containerRef} className="map" />
  </div>
  );
}