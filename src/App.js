import './App.css';
import MapContainer from './MapContainer';
import { useState } from 'react';

function App() {
  //const mapCenter = useState([10.20786,56.15890])
  const [mapCenter, setMapCenter] = useState([10.20786,56.15890])
  const [mapZoom, setMapZoom] = useState(9)
  const [baseHeight, setBaseHeight] = useState(300)
  const [topHeight, setTopHeight] = useState(500)

  const mapProps = {
    mapCenter: mapCenter,
    setMapCenter: setMapCenter,
    mapZoom: mapZoom,
    setMapZoom: setMapZoom,
    baseHeight: baseHeight,
    topHeight: topHeight,
  } 

  return (
    <div className="App">
      
        <MapContainer {...mapProps} />
      
    </div>
  );
}

export default App;
