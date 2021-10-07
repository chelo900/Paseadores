import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addImage, getPaseadorForId } from '../../actions/index'
import fotoPortada from '../../media/foto1.jpg'
import style from './PerfilWalker.module.css'
import foto1 from '../../media/foto1Service.jpg'
import { Link, useParams, useHistory } from 'react-router-dom'
import Nav from './nav/nav';




const PerfilWalker = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const history = useHistory();

  const Walker = useSelector((state) => state.detailWalker);


    useEffect(() => {
        dispatch(getPaseadorForId(id))
    }, [dispatch])

// Comentario choto

    const [file, setFile] = useState('')
    const handleInputChange = (e) => {
        setFile(e.target.files[0])
    };

    const handleSubmitImage = (e) => {
        e.preventDefault();
        if (!file) return;
        console.log('file', file)
        // upLoadImage(previewSource)
        addImage(file)
    }

    const handleLogout = (event) => {
        event.preventDefault();
        history.push("/");
    };

    // const upLoadImage=(base64EncodeImage)=>{
    //     console.log(base64EncodeImage)
    // }

    return (
        <div className={style.container}>
            <div className={style.containerPortada}>
                <img 
                className={style.fotoPortada} 
                src={fotoPortada}
                alt='foto' />
            </div>
            <div className={style.containerPerfil}>
                <div className={style.personalInformation}>
                    <div className={style.fotoPerfil}>
                        {Walker.image ? <img src={Walker.image} alt='' /> : <img src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" alt='' />}
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
                    <div className={style.descripcion}>
                        <h2>Description</h2>
                        <div className={style.textDescription}>
                            {Walker.description ? <p className={style.textDescriptionNew}>{Walker.description}</p> : <p>Agrega una descripcion</p>}
                        </div>
                        <Link to={`/walker/editDescription/${id}`} className={style.editContainer}>
                            <button className={style.editDescription}>Editar Descripcion</button>
                        </Link>
                    </div>
                    <div className={style.price}>
                        <h2>Price per Hour</h2>
                        {Walker.price != 0 ? <p>{Walker.price}  x Hour</p> : <p>Ponle un precio a tu servicio</p>}
                        <Link to={`/walker/editPrice/${id}`} className={style.editContainer}>
                            <button className={style.edit}>Editar Precio</button>
                        </Link>
                    </div>
                    {/* <div className={style.horario}>
                        <h2>Horarios</h2>
                        <table className={style.table} >
                            <tr>
                                <td><strong>Dia</strong></td>
                                <td><strong>Turno 1</strong></td>
                                <td><strong>Turno 2</strong></td>
                            </tr>
                            <tr>
                                <td>Lunes</td>
                                <td>9:00  - 12:00 </td>
                                <td>16:00 - 20:00</td>
                            </tr>
                            <tr>
                                <td>Martes</td>
                                <td>9:00  - 12:00 </td>
                                <td>16:00 - 20:00</td>
                            </tr>
                            <tr>
                                <td>Miercoles</td>
                                <td>9:00  - 12:00 </td>
                                <td>16:00 - 20:00</td>
                            </tr>
                            <tr>
                                <td>Jueves</td>
                                <td>9:00  - 12:00 </td>
                                <td>16:00 - 20:00</td>
                            </tr>  
                            <tr>
                                <td>Viernes</td>
                                <td>9:00  - 12:00 </td>
                                <td>16:00  - 20:00</td>
                            </tr>                            
                            <tr>
                                <td>Sabado</td>
                                <td>9:00  - 12:00 </td>
                                <td> - </td>
                            </tr>
                            <tr>
                                <td>Domingo</td>
                                <td> - </td>
                                <td> - </td>
                            </tr>
                        </table>
                        {/* {Walker.schedule? <p>{Walker.schedule}</p> : <p>Define tus horarios</p>} */}
                    {/* <Link to={`/walker/editHr/${id}`} className={style.editContainer}>
                            <button className={style.editHorario}>Editar Horarios</button>
                        </Link>
                    </div> */}
                    <div className={style.reputacion}>
                        <h2>Reputacion</h2>
                        <div className={style.textDescription}>
                            <p> * * * * *</p>
                        </div>
                    </div>
                    <div className={style.fotos}>
                        <div className={style.fondoFotos}>
                            <h2>Fotos</h2>
                            <div className={style.con}>
                                <div className={style.containerFotos}>
                                    {Walker.images?.map((image, index) => (
                                        <img
                                            className={style.litleImg}
                                            width="145px"
                                            height="145px"
                                            key={index}
                                            src={image.imageURL ? image.imageURL : foto1}
                                            alt='a'
                                        />
                                    )
                                    )}
                                </div>
                                <form action={`http://localhost:3001/postimages/${id}`} method="POST" encType="multipart/form-data">
                                    <input type="file" name="image" />
                                    <button type="submit">Subir</button>
                                </form>
                            </div>
                        </div>
                        {/* <div className={style.notificaciones}>
                    <iframe className={style.calendario}src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FArgentina%2FCordoba&showPrint=0&title=Mi%20Calendario&src=ODlhNGhoZDkwNHI1ajRsZXJkbnZldTA5YmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D81B60"></iframe>
                </div> */}
                    </div>
                    {/* <div className={style.containerCheckout}>
                <button className={style.checkout} onClick={handleLogout}> CERRAR SESION </button>
            </div> */}
                </div>
            </div>
        </div>
    )
}
export default PerfilWalker;
