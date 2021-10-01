import React, { useState, useEffect, useRef } from "react";
import { getAllPaseadores } from "../../actions";
import Card from "../Card/Card"
import style from "../Prueba/Prueba.module.css"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Prueba = () => {
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasEnded, setHasEnded] = useState(false);

    const container = useRef(null);


    useEffect(() => {
        document.addEventListener("scroll", trackScrolling)
    }, [users])
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
        console.log(result.data)
        if (result.data.lenght === 0) {
            setHasEnded(true);
        } else {
            setUsers(
                [...users, ...result.data]
            );
        }
        setLoading(false)
    }
    console.log(users)
    const renderCards = () => {
        users && users.map(user => (
            <Card
                key={user.id}
                id={user.id}
                name={user.name}
                surname={user.surname}
                image={user.image}
                reputation={user.reputation}
                service={user.service}
                price={user.price}
            />))
    }

    if (!users) return <div>No hay usuarios</div>
    return (
        <div>   
            <div className={style.container} ref={container}>
                <div className={style.userContainer}>
                    {users && users.map(user => (
                        <div className={style.flex}>
                            <Card
                                key={user.id}
                                id={user.id}
                                name={user.name}
                                surname={user.surname}
                                image={user.image}
                                reputation={user.reputation}
                                service={user.service}
                                price={user.price}
                            />
                        </div>
                    ))}
                    {loading && <div>Loading...</div>}
                    {hasEnded && (
                        <div className={style.ended}>
                            <p>Llegaste al final</p>
                        </div>
                    )}
                </div>
            </div>
    </div>
    )

}

export default Prueba



    // useEffect(()=>{
    //     dispatch(getAllPaseadores())
    // },[])

    // const handleScroll = event => {
    //     const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    //     if (scrollHeight - scrollTop === clientHeight) {
    //         setPage(prev => prev + 1)
    //     }
    // }

    // useEffect(() => {
    //     const loadUser = async () => {
    //         setLoading(true);
    //         setUsers(prev => [...prev, ...users]);
    //         setLoading(false);
    //     }
    //     loadUser();
    // }, [page])
