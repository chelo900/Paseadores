import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card"
import style from "../UsersCards/UsersCards.module.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Order, 
        FilterUbication, 
        FilterPrice,
        ubicationMatch   } from "../../actions/index"

const UsersCards = () => {
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasEnded, setHasEnded] = useState(false);

    const dispatch = useDispatch()
    const ubica = useSelector(state => state.ubication)
    const container = useRef(null);

    const [input, setInput] = useState({
        price : "",
        schedule : "",
        ubication : "",
    })

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

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        document.addEventListener("scroll", trackScrolling)
    }, [users])
    useEffect(()=>{
        
        dispatch(ubicationMatch(input.ubication))
        
    },  [input.ubication])
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
              
                    <select className = {style.rep}> 
                        <option value="order"> Order by Reputation </option>
                        <option value="DESC"> Higher </option>
                        <option value="ASC"> Smaller </option>
                    </select>
               
                
                    <label className = {style.pri}> Price : </label>
                    <select className = {style.pre} > 
                        <option value="order"> Order by Price</option>
                        <option value="DESC"> Higher </option>
                        <option value="ASC"> Smaller </option>
                    </select>
               
               
                    <div className = {style.opciones}>
                    <Link className = {style.dos}> $0 - $200 </Link>
                    
                    <Link className = {style.cuatro}> $201 - $400 </Link>
                    
                    <Link className = {style.seis}> $401 - $600 </Link>
                    
                    <Link className = {style.ocho}> $601 - $800 </Link>
                    
                    <Link className = {style.diez}> $801 - $1.000 </Link>

               
                    <input
                        className = {style.min}
                        type= "number"
                        placeholder = " $ Mínimo "
                        value = {input.price}
                        name = "price"
                        onChange = {e => handleChange(e)}
                    />
               
                    <label> - </label>
               
                    <input
                        className = {style.max}
                        type= "number"
                        placeholder = " $ Maximo "
                        value = {input.price}
                        name = "price"
                        onChange = {e => handleChange(e)}
                    />
                    <button className = {style.btn} > buscar </button>
                </div>
                <div>
                <form autocomplete="off">
                    <label className = {style.ubi}> Ubication : </label>
                        <input
                            className = {style.zon}
                            type= "search"
                            placeholder = "Zona "
                            value = {input.ubication}
                            name = "ubication"
                            list = "ubi"
                            onChange = {e => handleChange(e)}
                        />
                        <datalist id="ubi">
                            { ubica.length && ubica.map(t => {
                            return <option key={t} value={t}></option>} )}
                        </datalist>
                         <button className = {style.btn} > buscar </button>
                         </form>
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