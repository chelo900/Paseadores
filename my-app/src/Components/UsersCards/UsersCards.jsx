import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card"
import style from "../UsersCards/UsersCards.module.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaseadores,
        Order, 
        FilterUbication, 
        FilterPrice,   } from "../../actions/index"

const UsersCards = () => {
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasEnded, setHasEnded] = useState(false);

    const dispatch = useDispatch()
    // const ubica = useSelector(state => state.ubication)
    const container = useRef(null);
    
    // useEffect(() =>{  
    //     dispatch(getAllPaseadores()); 
    // },[dispatch])

    const [input, setInput] = useState({
        max : "",
        min : "",
        service : "",
        ubication : ""
    })

    // function handleOrder(e) {
    //     e.preventDefault();
    //     dispatch(Order(e.target.value))
    //     setPage(1);
    //     setOrder(`Ordenado ${e.target.value}`)
    // }

    // function handleFilterPrice(e) {
    //     dispatch(FilterPrice(e.target.value))
    // }

    // function handleFilterUbication(e) {
    //     dispatch(FilterUbication(e.target.value))
    // }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleClick(e) {
        e.preventDefault()
        dispatch(getAllPaseadores())
    }

    useEffect(() => {
        document.addEventListener("scroll", trackScrolling)
    }, [users])

    // useEffect(()=>{
    //     dispatch(ubicationMatch(input.ubication))
    // },  [input.ubication])

    useEffect(() => {
        if (!hasEnded) {
            fetch()
        }
        return () => {
            document.removeEventListener("scroll", trackScrolling)
        }
    }, [page])

    const trackScrolling = () => {
        if (container.current.getBoundingClientRect().bottom <= window.innerHeight) {
            console.log("Llegamos al final")
            setPage(page + 1);
            document.removeEventListener("scroll", trackScrolling)
        }
    }

    const fetch = async () => {
        setLoading(true);
        const result = await axios.get(
            `http://localhost:3001/allactivewalkers?page=${page}`
        );
        if (result.data.lenght === 0) {
            setHasEnded(true);
        } else {
            setUsers(
                [...users, ...result.data]
            );
        }
        setLoading(false)
    }
    if (!users) return <div>No hay usuarios</div>

    return (
        <div className={style.container} ref={container}>
            <div className = {style.costado}>
                <div >
                    <select onChange = {(e) => handleOrder(e)} className = {style.rep}> 
                        <option value="order"> Ordenar por Reputacion </option>
                        <option value="DESC"> Alto </option>
                        <option value="ASC"> Bajo </option>
                    </select>
                </div>
                <div>
                    <select  className = {style.pre} > 
                        <option value="order"> Ordenar por Precio</option>
                        <option value="DESC"> Alto </option>
                        <option value="ASC"> Bajo </option>
                    </select>
                </div>
                <div>
                    <label className = {style.pri}> Precio : </label>
                    <div className = {style.opciones}>
                    <Link className = {style.dos}> $0 - $200 </Link>
                    
                    <Link className = {style.cuatro}> $201 - $400 </Link>
                    
                    <Link className = {style.seis}> $401 - $600 </Link>
                    
                    <Link className = {style.ocho}> $601 - $800 </Link>
                    
                    <Link className = {style.diez}> $801 - $1.000 </Link>
                </div>
                    <input
                        className = {style.min}
                        type= "text"
                        placeholder = " $ Mínimo "
                        value = {input.min}
                        name = "min"
                        onChange = {e => handleChange(e)}
                    />
                <div>
                    <label> - </label>
                </div>
                    <input
                        className = {style.max}
                        type= "text"
                        placeholder = " $ Maximo "
                        value = {input.max}
                        name = "max"
                        onChange = {e => handleChange(e)}
                    />
                    <button className = {style.btn} > buscar </button>
                </div>
                <div>
                    <label className = {style.ubi}> Ubicacion : </label>
                        <input
                            className = {style.zon}
                            type= "text"
                            placeholder = "Zona "
                            value = {input.ubication}
                            name = "ubication"
                        />
                         <button className = {style.btn} > buscar </button>
                </div>
                <div>
                        <select className = {style.hora}> 
                            <option value="order"> Filtrar por Horario </option>
                            <option value="m"> Mañana </option>
                            <option value="a"> Tarde </option>
                            <option value="t"> Todos </option>
                        </select>
                </div>
                <div>
                        <select className = {style.serv}> 
                            <option value="order"> Filtrar por Servicio </option>
                            <option value="p"> Paseador </option>
                            <option value="c"> Cuidador </option>
                            <option value="pyc"> Paseador y Cuidador </option>
                        </select>
                </div>
                <div>
                    <button className = {style.atc} onClick = {e => handleClick(e)}> Todos los Paseadores </button>
                </div>
            </div>
            <div >
                <div className={style.userContainer}>
                    {users && users.map(user => (
                        <div className={style.flex}>
                            <Card
                                key={user.id}
                                // id={user.id}
                                name={user.name}
                                surname={user.surname}
                                image={user.image}
                                reputation={user.reputation}
                                service={user.service}
                                price={user.price}
                            />
                        </div>
                    ))}
                    {hasEnded && (
                        <div className={style.ended}>
                            <p>Llegaste al final</p>
                        </div>
                    )}
                </div>
            {loading && <div className={style.loading}><p className={style.p}>Loading...</p></div>}
            </div>
        </div>
    )

}

export default UsersCards
/*
<input
                            className = {style.zon}
                            type= "search"
                            placeholder = "Zona "
                            value = {input.ubication}
                            name = "ubication"
                            list = "ubi"
                        />*/