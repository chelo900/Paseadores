import React from "react";
import { Marker, Popup, CircleMarker} from 'react-leaflet';
import L from "leaflet"
import icon from '../media/icon.png'


var icono = L.icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        iconSize: new L.Point(28, 35),
        className: 'Leaflet-venue-icon'
    });
const Markers = (props) => {
const {allUsers} = props

const markers = allUsers.map((el,i) => (
<Marker key={i} position={[el.latitude,el.longitude]} icon={icono} >
  <Popup>
   <h3> {el.name} {el.surname}</h3>
    {el.service}
  </Popup>
  </Marker>
  
  ))
 
   return markers;
  
  
};
export default Markers;
