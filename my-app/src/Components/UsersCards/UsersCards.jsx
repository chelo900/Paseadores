import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card"
import Nav from './Nav/nav'
import style from "../UsersCards/UsersCards.module.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Order,
    FilterUbication,
    FilterPrice,
    ubicationMatch,
    getAllPaseadores,
    putDetailsProfile } from "../../actions/index"


const UsersCards = () => {


    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.allPaseadores);
    console.log("todos",allUsers)

    // Paginado
    const [page, setPage] = useState(0);
    const [limitPerPage, setLimitPerPage] = useState(5);
    const [order, setOrder] = useState("");

     const ubica = useSelector(state => state.ubication)


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
        window.scrollTo({top:0, left:0, behavior:'smooth'})
        setPage(page + 1)
    }

    function handlePrevPage(e) {
        e.preventDefault();
        window.scrollTo({top:0, left:0, behavior:'smooth'})
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
            <Nav />
            {console.log(allUsers, 'alll')}
            <div className={style.containerDOS}>
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
                    <div className={style.precio}>
                        <label className={style.pri}> Precio : </label>
                        <hr></hr>
                        <div className={style.opciones}>
                            <Link className={style.dos}><p> $0 - $200</p> </Link>
                            <Link className={style.dos}><p> $201 - $400</p> </Link>
                            <Link className={style.dos}><p> $401 - $600</p> </Link>
                            <Link className={style.dos}><p>$601 - $800</p> </Link>
                            <Link className={style.dos}><p> $801 - $1.000</p> </Link>
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
                        <button className={style.btn} > Buscar </button>
                    </div>
                    <div>
                        <form autocomplete="off" className={style.precio}>
                            <label className={style.ubi}> Ubicacion : </label>
                            {/* <hr></hr> */}
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
                            <button className={style.btn} > Buscar </button>
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

                <div className={style.cards}>
                    {
                        allUsers.content?.length > 0 ? allUsers.content.map(el => {
                            return (
                               
                                    <Card
                                        id={el.id}
                                        name={el.name}
                                        surname={el.surname}
                                        image={el.image}
                                        service={el.service}
                                        price={el.price}
                                        reputation={el.reputation}
                                        description={el.description}
                                    />
                            )
                        }) :
                            <div>
                                <p>No se encontraron usuarios</p>
                            </div>
                    }
                    <div className={style.pagination}>
                            {page === 0? null : <button className={style.prev} onClick={handlePrevPage}>
                                <p>&#60;</p>
                            </button> }             
                            {page === (allUsers.totalPages - 1)? null : <button className={style.next} onClick={handleNextPage}>
                                <p>&#62;</p>
                            </button>}
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default UsersCards

