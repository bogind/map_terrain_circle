import {MapboxLayer} from '@deck.gl/mapbox';
import {TerrainLayer} from '@deck.gl/geo-layers';
import * as turf from '@turf/turf';

export const style = {
    "version": 8,
    "name": "Base OSM Style",
    "sources": {
        "osm": {
            "type": "raster",
            "tiles": ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            "attribution": "© OpenStreetMap contributors"
        }
    },
    "layers": [{
        "id": "osm",
        "type": "raster",
        "source": "osm",
        "minzoom": 0,
        "maxzoom": 22
    }]
};

export function onMapLoad(props){
    const {map, mapCenter, baseHeight, topHeight} = props;
    const mapCenterBuffer = createCenterBuffer(mapCenter);
    console.log(map);

    map.addSource('circle', {
        'type': 'geojson',
        'data': './circle.geojson'
    });

    map.addSource('center', {
        'type': 'geojson',
        'data': mapCenterBuffer
    });

    let circleBaseLayer = {
        'id': 'circle-base',
        'type': 'fill-extrusion',
        'source': 'circle', // reference the data source
        'layout': {},
        'paint': {
        'fill-extrusion-color': '#222222', 
        'fill-extrusion-height': topHeight-(baseHeight/10),
        'fill-extrusion-base': baseHeight
        }
    };

    let centerLayer = {
        'id': 'center',
        'type': 'fill-extrusion',
        'source': 'center',
        'layout': {},
        'paint': {
            'fill-extrusion-color': '#ff0000', 
            'fill-extrusion-height': topHeight+(baseHeight/5),
            //'fill-extrusion-base': topHeight+(baseHeight/10)
            'fill-extrusion-base': 0
        }
    };

    map.addLayer(circleBaseLayer);
    map.addLayer(centerLayer);
    
    const terrainLayer = new MapboxLayer({
        id: 'terrain_circle',
        type: TerrainLayer,
        // SRTM Clipped data
        texture: './N56E010.clipped2.mask.png',
        elevationData: './N56E010.clipped2.png',
        elevationDecoder: {
            rScaler: 2,
            gScaler: 2,
            bScaler: 2,
            offset: 500
          },
          // AWS Terrarium tiles
          /*
          elevationData: 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
          elevationDecoder: { 
            rScaler: 256, 
            gScaler: 1, 
            bScaler: 1 / 256, 
            offset: -32768 
        },
        */
        bounds: [10.1011403340000001,56.1072954910000021 , 10.2981740639999995,56.2170125270000014],
      });
      
    map.addLayer(terrainLayer);



}

function createCenterBuffer(center, radius=200){
    let centerGJ = turf.point(center); // turf.point takes [lng, lat] (opposite of mapbox)
    let circle = turf.buffer(centerGJ, radius/1000, {units: 'kilometers'});
    return circle;
}