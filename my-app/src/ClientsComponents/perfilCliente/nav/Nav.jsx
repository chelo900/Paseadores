import React,{useState} from 'react'
import style from './Nav.module.css'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../actions/index";
import menu from '../../../media/menu.png'
import SearchBar from '../../../Components/SearchBar/SearchBar';

const Nav = ({id}) => {
    const [open, setOpen] = useState(false)

    const history = useHistory();

    const dispatch = useDispatch();

    const handlerHamburguer = ()=>{
        setOpen(!open)
    }

    function handleOnClick(e) {
        localStorage.clear();
        history.push(`/`);
        dispatch(clearUser({}))
    }
    return (
        <div className={style.container}>
            <div className={style.serviceContainer}>
                <h2 className={style.service}>Happy Dog!</h2>
            </div>
           <div className={style.log}>
               <button className={style.hamburguesa} onClick={e =>handlerHamburguer()}><img src={menu} alt='a'/></button>
               {open?<div className={style.menu}>
                   <ul>
                       <Link to={`/cardsUsers`} className={style.textdeco}>
                            <li>Home</li>
                       </Link>
                       <Link to={`/listFav`} className={style.textdeco}>
                            <li>Favoritos</li>
                        </Link>
                       <button onClick={handleOnClick}>
                            <li className={style.cerrar}>Logout</li>
                       </button>
                   </ul>

               </div>:null}
            </div>  
         </div>
    )
}

export default Nav






// return (
//     <div className={style.container}>
//        <Nav/>
       
//         <div className={style.containerPerfil}>
//             <div className={style.personalInformation}>
//                 <div className={style.borderFoto}>
//                     <div className={style.fotoPerfil}>
//                         {Walker.image? <img src={Walker.image} alt=''/> : <img src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" alt='' />}
//                     </div>
//                 </div>
//                 <div className={style.informacion}>
//                     <h2>{Walker.name} {Walker.surname}</h2>
//                     <ul >
//                         <li className={style.liService}>{Walker.service}</li>
//                         <li className={style.libirth}>{Walker.birth_day}</li>
//                         <li className={style.liPhone}>{Walker.phone}</li>
//                         <li className={style.liEmail}>{Walker.email}</li>
//                         <li className={style.liUbication}>{Walker.ubication}</li>
//                         <li className={style.liDni}>{Walker.dni}</li>
//                     </ul>
//                     <Link to={`/walker/editInformation/${id}`} className={style.editContainerInfo}>
//                         <button className={style.editDescription}>Editar Informacion</button>
//                     </Link>
//                 </div>
//             </div>

//             <div className={style.caracteristicas}>
//                 <div className={style.descripcion}>
//                     <h2>Description</h2>
//                     <div className={style.textDescription}>
//                         {Walker.description? <p className={style.textDescriptionNew}>{Walker.description}</p> : <p>Agrega una descripcion</p> }
//                     </div>
//                     <Link to={`/walker/editDescription/${id}`} className={style.editContainer}>
//                         <button className={style.editDescription}>Editar Descripcion</button>
//                     </Link>
//                 </div>
//                 <div className={style.price}>
//                     <h2>Price per Hour</h2>
//                     <div className={style.textDescription}>
//                          {Walker.price != 0? <p>{Walker.price}  x Hour</p> : <p>Ponle un precio a tu servicio</p>}
//                     </div>
//                     <Link to={`/walker/editPrice/${id}`} className={style.editContainer}>
//                         <button className={style.edit}>Editar Precio</button>
//                     </Link>
//                 </div>
//                 <div className={style.reputacion}>
//                     <h2>Reputacion</h2>
//                     <div className={style.textDescription}>
//                         <p> * * * * *</p>
//                     </div>
//                 </div>
//                 <div className={style.fotos}>
//                   <div className={style.fondoFotos}>
//                     <h2>Fotos</h2>
//                        <div className={style.galeria}>
//                        { Walker.images?.map(i=>
//                         <div  key={i.public_id}>
//                             <img src={i.imageURL ? i.imageURL : foto1} alt='a'/>
//                         </div>)
//                         }
//                        </div>
//                         <form  action={`http://localhost:3001/postimages/${id}`} method="POST" encType="multipart/form-data">
//                             <input type="file" name="image" />
//                             <button  className={style.subir} type="submit">Subir</button>
//                         </form>
//                   </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// )
// }
