import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card"
import style from "../UsersCards/UsersCards.module.css"
import axios from "axios";

const UsersCards = () => {
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
                    {hasEnded && (
                        <div className={style.ended}>
                            <p>Llegaste al final</p>
                        </div>
                    )}
                </div>
            </div>
            {loading && <div className={style.loading}><p className={style.p}>Loading...</p></div>}
        </div>
    )

}

export default UsersCards