import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card"
import style from "../UsersCards/UsersCards.module.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Order,
    FilterUbication,
    FilterPrice,
    ubicationMatch,
    getAllPaseadores } from "../../actions/index"


const UsersCards = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.allPaseadores);
    console.log("todos",allUsers)

    // Paginado
    const [page, setPage] = useState(0);
    const [limitPerPage, setLimitPerPage] = useState(5);
    const [order, setOrder] = useState("");

<<<<<<< HEAD
     const ubica = useSelector(state => state.ubication)

    console.log(page)
    console.log(limitPerPage)
=======
    // const ubica = useSelector(state => state.ubication)
    console.log(allUsers)
>>>>>>> a7a24d8 (css fix)
    useEffect(() => {
        dispatch(getAllPaseadores(page, limitPerPage))
    }, [page])

    const [input, setInput] = useState({
        max : "",
        min : "",
        service : "",
        ubication : "",
    })

    function handleNextPage(e) {
        e.preventDefault();
        if (page === (allUsers.totalPages - 1)) {
            return alert("Ultima pagina")
        }
        setPage(page + 1)
    }

    function handlePrevPage(e) {
        e.preventDefault();
        if (page === 0) {
            return alert("Estás en la primera página")
        }
        setPage(page - 1)
    }

    function handleOrder(e) {
        console.log(e.target.name)
        e.preventDefault();
        dispatch(Order(e.target.value, e.target.name))
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleClick(e) {
        e.preventDefault()
        dispatch(getAllPaseadores())
    }

     useEffect(() => {
         dispatch(ubicationMatch(input.ubication))
     }, [input.ubication])


    return (
        <div className={style.container}>
            <div className={style.costado}>
                <div>
                    <select name = "reputation" className = {style.rep} onChange={e=>handleOrder(e)}>
                        <option value="order"> Ordenar por Reputacion </option>
                        <option value="DESC"> Alta </option>
                        <option value="ASC"> Baja </option>
                    </select>
                </div>
                <div>
                    <select name = "price" className = {style.pre} onChange = {e => handleOrder(e)}>
                        <option value="order"> Ordenar por Precio</option>
                        <option value="DESC"> Alto </option>
                        <option value="ASC"> Bajo </option>
                    </select>
                </div>
                <div>
                    <label className={style.pri}> Precio : </label>
                    <div className={style.opciones}>
                        <Link className={style.dos}> $0 - $200 </Link>
                        <Link className={style.cuatro}> $201 - $400 </Link>
                        <Link className={style.seis}> $401 - $600 </Link>
                        <Link className={style.ocho}> $601 - $800 </Link>
                        <Link className={style.diez}> $801 - $1.000 </Link>
                </div>
                    <input
                        className={style.min}
                        type="number"
                        placeholder=" $ Mínimo "
                        value={input.min}
                        name="min"
                        onChange={e => handleChange(e)}
                    />
                    <div>
                        <label> - </label>
                    </div>
                    <input
                        className={style.max}
                        type="number"
                        placeholder=" $ Maximo "
                        value={input.max}
                        name="max"
                        onChange={e => handleChange(e)}
                    />
                    <button className={style.btn} > buscar </button>
                </div>
                <div>
                    <form autocomplete="off">
                        <label className={style.ubi}> Ubicacion : </label>
                        <input
                            className={style.zon}
                            type="search"
                            placeholder="Zona "
                            value={input.ubication}
                            name="ubication"
                            onChange={e => handleChange(e)}
                            list="ubi"
                        />
                        <datalist id="ubi">
                            { ubica?.map(t => {
                                return <option key={t} value={t}></option>} )}
                        </datalist>
                        <button className={style.btn} > buscar </button>
                    </form>
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
            </div>
            <div>
                {
                    allUsers.content?.length > 0 ? allUsers.content.map(el => {
                        return (
                            <Link>
                                <Card
                                    id={el.id}
                                    name={el.name}
                                    surname={el.surname}
                                    image={el.image}
                                    reputation={el.reputation}
                                    service={el.service}
                                    price={el.price}
                                />
                            </Link>
                        )
                    }) :
                        <div>
                            <p>No se encontraron usuarios</p>
                        </div>
                }
                <div className={style.prev}>
                    <button onClick={handlePrevPage}>
                        <p>&#60;</p>
                    </button>
                </div>
                <div className={style.next}>
                    <button onClick={handleNextPage}>
                        <p>&#62;</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UsersCards

