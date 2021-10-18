import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet"
import icon from '../media/icon.png'


const MapView = ({latitude, longitude}) => {


  
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
        });
  return <MapContainer center={{lat:"-34.6095451",lng:"-58.4391846"}} zoom={11} scrollWheelZoom={true}>
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     {latitude && <Marker position={{lat: latitude, lng: longitude}} icon={icono} >
      <Popup>
       A pretty CSS3 popup. <br /> Easily customizable.
     </Popup>
    </Marker>}
  </MapContainer>
    
  
};
export default MapView;
