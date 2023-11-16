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
    const map = props.map;
    console.log(map);

}