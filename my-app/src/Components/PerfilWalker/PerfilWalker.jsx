import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addImage, getPaseadorForId } from '../../actions/index'
import style from './PerfilWalker.module.css'
import foto1 from '../../media/foto1Service.jpg'
import { Link, useParams, useHistory } from 'react-router-dom'
import Nav from './nav/nav';
import Footer from './footer/Footer';

const PerfilWalker = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const history = useHistory();

  const Walker = useSelector((state) => state.detailWalker);


    useEffect(() => {
        dispatch(getPaseadorForId(id))
    }, [dispatch])

// Comentario choto

    // const [file, setFile] = useState('')
    // const handleInputChange = (e) => {
    //     setFile(e.target.files[0])
    // };

    // const handleSubmitImage = (e) => {
    //     e.preventDefault();
    //     if (!file) return;
    //     console.log('file', file)
    //     // upLoadImage(previewSource)
    //     addImage(file)
    // }

    // const handleLogout = (event) => {
    //     event.preventDefault();
    //     history.push("/");
    // };

    // const upLoadImage=(base64EncodeImage)=>{
    //     console.log(base64EncodeImage)
    // }

    return (
        <div className={style.container}>
           <Nav/>
           
            <div className={style.containerPerfil}>
                <div className={style.personalInformation}>
                    <div className={style.borderFoto}>
                        <div className={style.fotoPerfil}>
                            {Walker.image? <img src={Walker.image} alt=''/> : <img src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" alt='' />}
                        </div>
                    </div>
                    <div className={style.informacion}>
                        {/* <h2>{Client.name} {Client.surname}</h2> */}
                        <ul >
                            <li className={style.liService}>{Walker.service}</li>
                            <li className={style.libirth}>{Walker.birth_day}</li>
                            <li className={style.liPhone}>{Walker.phone}</li>
                            <li className={style.liEmail}>{Walker.email}</li>
                            <li className={style.liUbication}>{Walker.ubication}</li>
                            <li className={style.liDni}>{Walker.dni}</li>
                        </ul>
                        <Link to={`/walker/editInformation/${id}`} className={style.editContainerInfo}>
                            <button className={style.editDescription}>Editar Informacion</button>
                        </Link>
                    </div>
                </div>
                
                <div className={style.caracteristicas}>
                    <div  className={style.Premuim} >
                        <Link to ="/premium">
                            <button className={style.btnPremuim} type="submit">Hacerme premium</button>
                        </Link>
                    </div>
                    <div className={style.descripcion}>
                        <h2>Description</h2>
                        <div className={style.textDescription}>
                            {Walker.description? <p className={style.textDescriptionNew}>{Walker.description}</p> : <p>Agrega una descripcion</p> }
                        </div>
                        <Link to={`/walker/editDescription/${id}`} className={style.editContainer}>
                            <button className={style.editDescription}>Editar Descripcion</button>
                        </Link>
                    </div>
                    <div className={style.price}>
                        <h2>Price per Hour</h2>
                        <div className={style.textDescription}>
                             {Walker.price != 0? <p>{Walker.price}  x Hour</p> : <p>Ponle un precio a tu servicio</p>}
                        </div>
                        <Link to={`/walker/editPrice/${id}`} className={style.editContainer}>
                            <button className={style.edit}>Editar Precio</button>
                        </Link>
                    </div>
                    <div className={style.reputacion}>
                        <h2>Reputacion</h2>
                        <div className={style.textDescription}>
                            <p> * * * * *</p>
                        </div>
                    </div>
                    <div className={style.fotos}>
                      <div className={style.fondoFotos}>
                        <h2>Fotos</h2>
                           <div className={style.galeria}>
                           { Walker.images?.map(i=>
                            <div  key={i.public_id}>
                                <img src={i.imageURL ? i.imageURL : foto1} alt='a'/>
                            </div>)
                            }
                           </div>
                            <form  action={`http://localhost:3001/postimages/${id}`} method="POST" encType="multipart/form-data">
                                <input type="file" name="image" />
                                <button  className={style.subir} type="submit">Subir</button>
                            </form>
                      </div>
                    </div>
                </div>
                
            </div>
            {/* <Footer /> */}
        </div>
    )
}
export default PerfilWalker;
