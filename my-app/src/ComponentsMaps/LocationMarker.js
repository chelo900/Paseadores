import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker, useMapEvents, mouseEvent, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { divIcon } from "leaflet"
import icon from '../media/icon.png'
import style from "../ComponentsMaps/MapView.module.css"
import { useSelector, useDispatch } from "react-redux";
import { getPaseadorForId, putDetailsUser } from "../actions/index";
import Markers from "./Markers"

function LocationMarker({name,surname,latitude,longitude}) {

    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");

    const dispatch = useDispatch();

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    function LocationMa() {

    console.log("automatico")
  const map =  useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
        dispatch(
            putDetailsUser(
              {
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
              },
              id,
              token))
              dispatch(getPaseadorForId(id, token));
        console.log(e.latlng.lng)
        const { lat, lng } = e.latlng;
      setPosition({
        latitude: lat,
        longitude: lng,
      })
      map.flyTo(e.latlng, map.getZoom())
    },
  })

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
    <h3>Haz click en el mapa para localizarte</h3>
        <MapContainer center={pos} zoom={13} scrollWheelZoom={true} >
           <TileLayer
           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
      
      <LocationMa/>
       </MapContainer>
   </div>
    )
}
     
    export default LocationMarker;