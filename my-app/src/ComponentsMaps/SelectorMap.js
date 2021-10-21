import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker, useMapEvents, mouseEvent, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { divIcon } from "leaflet"
import icon from '../media/icon.png'
import style from "../ComponentsMaps/MapView.module.css"
import { useSelector, useDispatch } from "react-redux";
import { getPaseadorForId, putDetailsUser } from "../actions/index";
import Markers from "./Markers"




const SelectorMap = ({name, surname, }) => {

    const Walker = useSelector((state) => state.detailWalker);
    
    
    const [localization, setLocalization] = useState();
    console.log("localizationnnnnnnnnnnnnnnnnnnn")
    console.log(localization)
    
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");
    
    const dispatch = useDispatch();
    
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    
    useEffect(async () => {
        dispatch(getPaseadorForId(id, token));
        if (typeof Walker.latitude == 'string') {
            setLocalization( "localization saved")
            setPosition({latitude: Walker.latitude, longitude: Walker.longitude})
        }else{setLocalization( "localization manual")}
      }, [dispatch]);

    function AddMarkerToClick() {
        console.log("manual")
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
          ); }

    function handleOnClick1(e) {
        e.preventDefault();
        console.log("soy verdaaaaaaaaaaa")
        setLocalization("localization auto")
    }
    function handleOnClick2(e) {
        e.preventDefault();
console.log("soy false")
        setLocalization("localization manual")
    }
   
   
   
    function LocationMarker() {

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
        ); }
    
    let pos;

!Walker.latitude ? pos = ["-34.606783","-58.435958"] : pos = [Walker.latitude,Walker.longitude]
console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
console.log(pos)
  return <div className={style.map}>
 
       <h2 className={style.ubicacion}>Ubicacion:</h2>
         <button   className={style.botones} onClick={(e) => {
            handleOnClick1(e)}}>Detectar </button>
            
         <button  className={style.botones} onClick={(e) => {
            handleOnClick2(e)}}>Agregar  manualmente</button>
            
            {localization === "localization manual" && 
            <h3 >Selecion tu ubicación en el mapa</h3>
            }
            {localization === "localization auto" &&
            <h3 >Haz click en el mapa para localizarte</h3>
            }
            
    
   <MapContainer center={pos} zoom={13} scrollWheelZoom={true} >
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   {localization === "localization manual" &&
<AddMarkerToClick name={name} surname={surname}/>}
{localization === "localization auto" &&
<LocationMarker name={name} surname={surname}/>
}
{localization === "localization saved" &&  ( <CircleMarker center={[position.latitude, position.longitude]} color= 'blue'  fillColor= '#0000FF' fillOpacity= "0.5" radius= "50"  stroke={false} >
           <Popup>
        {name} {surname}
      </Popup>
      </CircleMarker>)}
  </MapContainer>
  
   
  </div>
  
};
export default SelectorMap;

