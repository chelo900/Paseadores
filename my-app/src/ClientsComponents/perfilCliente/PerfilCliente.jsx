import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./PerfilCliente.module.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { getClienteForId } from "../../actions/index";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";
import foto1 from "../../media/foto1Service.jpg";

const PerfilCliente = () => {
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  const dispatch = useDispatch();
  const history = useHistory();

  const Client = useSelector((state) => state.detailCliente);

  useEffect(() => {
    if (!token) {
      history.push(`/login`);
    }
    dispatch(getClienteForId(id, token));
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Nav />
      <div className={style.containerPerfil}>
        <div className={style.personalInformation}>
          <div className={style.borderFoto}>
            <div className={style.fotoPerfil}>
              {Client.image ? (
                <img src={Client.image} alt="" />
              ) : (
                <img
                  src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className={style.informacion}>
            <h2>
              {Client.name} {Client.surname}
            </h2>
            <ul>
              <li className={style.liPhone}>{Client.phone}</li>
              <li className={style.liEmail}>{Client.email}</li>
              <li className={style.liUbication}>{Client.ubication}</li>
            </ul>
            <Link
              to={`/Cliente/editInformation/${id}`}
              className={style.editContainerInfo}
            >
              <button className={style.editDescription}>
                Editar Informacion
              </button>
            </Link>
          </div>
        </div>

        <div className={style.caracteristicas}>
          <div className={style.descripcion}>
            <h2>Descripción</h2>
            <div className={style.textDescription}>
              {Client.description ? (
                <p className={style.textDescriptionNew}>{Client.description}</p>
              ) : (
                <p>Agrega una descripcion</p>
              )}
            </div>
            <Link
              to={`/Cliente/editDescription/${id}`}
              className={style.editContainer}
            >
              <button className={style.editDescription}>
                Editar Descripción
              </button>
            </Link>
          </div>
          <div className={style.reputacion}>
            <h2>Reputación</h2>
            <div className={style.textDescription}>
              <p> * * * * *</p>
            </div>
          </div>
          <div className={style.fotos}>
            {/* <div className={style.fondoFotos}>
                        <h2>Fotos</h2>
                            <div className={style.galeria}>
                            { Client.images?.map(i=>
                            <div  key={i.public_id}>
                                <img src={i.imageURL ? i.imageURL : foto1} alt='a'/>
                            </div>)
                            }
                            </div>
                            <form  action={`/postimages/${id}`} method="POST" encType="multipart/form-data">
                                <input type="file" name="image" />
                                <button  className={style.subir} type="submit">Subir</button>
                            </form>
                      </div> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default PerfilCliente;
