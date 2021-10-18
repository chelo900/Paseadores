import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { divIcon } from "leaflet"
import icon from '../media/icon.png'


const MapView = ({latitude, longitude, name, surname}) => {


  /*
    var icono = L.icon({
            iconUrl: icon,
            iconRetinaUrl: icon,
        //    color: 'red',
   // fillColor: '#f03',
    //fillOpacity: 0.5,
   // radius: 500,
          //  iconAnchor: null,
           // popupAnchor: null,
           // shadowUrl: null,
           // shadowSize: null,
           // shadowAnchor: null,
            iconSize: new L.Point(20, 25),
            className: 'Leaflet-venue-icon'
        });*/
  return <div>
   {latitude && <MapContainer center={{lat:latitude,lng:longitude}} zoom={13} scrollWheelZoom={true}>
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      <CircleMarker center={{lat:latitude,lng:longitude}} color= 'blue'  fillColor= '#0000FF' fillOpacity= "0.5" radius= "50"  stroke={false} >
    <Popup>
      {name} {surname}
    </Popup>
    </CircleMarker>
  </MapContainer>}
  </div>
  
};
export default MapView;
