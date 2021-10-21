import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker, useMapEvents, mouseEvent, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { divIcon } from "leaflet"
import icon from '../media/icon.png'
import style from "../ComponentsMaps/MapView.module.css"
import { useSelector, useDispatch } from "react-redux";
import { getPaseadorForId, putDetailsUser } from "../actions/index";
import Markers from "./Markers"

function AddMarkerToClick({name,surname,latitude,longitude}) {

    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");

    const dispatch = useDispatch();
    
    
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    

    function AddMarker() {
    const map = useMapEvents({
        click(event) {
            const { lat, lng } = event.latlng;
            dispatch(
                putDetailsUser(
              {
                latitude: event.latlng.lat,
                longitude: event.latlng.lng,
              },
              id,
              token))
              dispatch(getPaseadorForId(id, token));
        setPosition({
          latitude: lat,
          longitude: lng,
        });
      },
    });
    
    return (
      position.latitude !== 0 ? (
        <CircleMarker center={[position.latitude, position.longitude]} color= 'blue'  fillColor= '#0000FF' fillOpacity= "0.5" radius= "50"  stroke={false} >
         <Popup>
      {name} {surname}
    </Popup>
    </CircleMarker>
      ) : null
      );
     }


     let pos;
     !latitude ? pos = ["-34.606783","-58.435958"] : pos = [latitude,longitude]
   return(
       <div>
   <h3>Marcá tu zona en el mapa</h3>
       <MapContainer center={pos} zoom={13} scrollWheelZoom={true} >
          <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
     
     <AddMarker/>
      </MapContainer>
  </div>
   )
      
}
      export default AddMarkerToClick;