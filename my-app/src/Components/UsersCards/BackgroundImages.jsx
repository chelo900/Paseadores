import style from "./UsersCards.module.css";
import fotoFondo from "../../media/proceso2.jpg";
import fotoFondo2 from "../../media/foto2Service.jpg";
import fotoFondo3 from "../../media/premiumcortada.jpg";
import fotoFondo4 from "../../media/fotoAbout.jpg";
function BackgroundImages({ allUsers }) {
  return (
    <div>
      <img className={style.fotoFondo} src={fotoFondo} alt="fotoFondo" />
      {allUsers.content?.length > 1 ? (
        <img className={style.fotoFondo2} src={fotoFondo2} alt="fotoFondo" />
      ) : null}
      {allUsers.content?.length > 3 ? (
        <img className={style.fotoFondo3} src={fotoFondo3} alt="fotoFondo" />
      ) : null}
      {allUsers.content?.length > 4 ? (
        <img className={style.fotoFondo4} src={fotoFondo4} alt="fotoFondo" />
      ) : null}
    </div>
  );
}

export default BackgroundImages;
