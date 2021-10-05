import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card"
import style from "../UsersCards/UsersCards.module.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Order,
    FilterUbication,
    FilterPrice,
    ubicationMatch
} from "../../actions/index"
import { getAllPaseadores } from '../../actions'


const UsersCards = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.allPaseadores);

    // Paginado
    const [page, setPage] = useState(0);
    const [limitPerPage, setLimitPerPage] = useState(5);
    const [order, setOrder] = useState("");

    // const ubica = useSelector(state => state.ubication)
    console.log(page)
    console.log(limitPerPage)
    useEffect(() => {
        dispatch(getAllPaseadores(page, limitPerPage))
        console.log(allUsers)
    }, [page])

    const [input, setInput] = useState({
        price: "",
        schedule: "",
        ubication: "",
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

    // function handleOrder(e) {
    //     e.preventDefault();
    //     dispatch(Order(e.target.value))
    // }

    // function handleFilterPrice(e) {
    //     dispatch(FilterPrice(e.target.value))
    // }

    // function handleFilterUbication(e) {
    //     dispatch(FilterUbication(e.target.value))
    // }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {

        dispatch(ubicationMatch(input.ubication))

    }, [input.ubication])


    return (
        <div className={style.container}>
            <div className={style.costado}>
                <select className={style.rep}>
                    <option value="order"> Order by Reputation </option>
                    <option value="DESC"> Higher </option>
                    <option value="ASC"> Smaller </option>
                </select>
                <label className={style.pri}> Price : </label>
                <select className={style.pre} >
                    <option value="order"> Order by Price</option>
                    <option value="DESC"> Higher </option>
                    <option value="ASC"> Smaller </option>
                </select>
                <div className={style.opciones}>
                    <Link className={style.dos}> $0 - $200 </Link>
                    <Link className={style.cuatro}> $201 - $400 </Link>
                    <Link className={style.seis}> $401 - $600 </Link>
                    <Link className={style.ocho}> $601 - $800 </Link>
                    <Link className={style.diez}> $801 - $1.000 </Link>
                    <input
                        className={style.min}
                        type="number"
                        placeholder=" $ Mínimo "
                        value={input.price}
                        name="price"
                        onChange={e => handleChange(e)}
                    />
                    <label> - </label>
                    <input
                        className={style.max}
                        type="number"
                        placeholder=" $ Maximo "
                        value={input.price}
                        name="price"
                        onChange={e => handleChange(e)}
                    />
                    <button className={style.btn} > buscar </button>
                </div>
                <div>
                    <form autocomplete="off">
                        <label className={style.ubi}> Ubication : </label>
                        <input
                            className={style.zon}
                            type="search"
                            placeholder="Zona "
                            value={input.ubication}
                            name="ubication"
                            list="ubi"
                            onChange={e => handleChange(e)}
                        />
                        <datalist id="ubi">
                            {/* {ubica.length && ubica.map(t => {
                                return <option key={t} value={t}></option>
                            })} */}
                        </datalist>
                        <button className={style.btn} > buscar </button>
                    </form>
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

