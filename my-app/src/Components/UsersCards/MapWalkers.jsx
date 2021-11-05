import Nav from "./Nav/Nav";
import style from "./Nav/Nav.module.css";
import MapView from "../../ComponentsMaps/MapView";

const MapWalkers = () => {
  return (
    <div className={style.container}>
      <Nav />

      <MapView fullscream={true} />
    </div>
  );
};

export default MapWalkers;
