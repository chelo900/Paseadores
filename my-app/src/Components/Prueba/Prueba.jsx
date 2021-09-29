import React, { useState, useEffect } from "react";
import Card from "../Card/Card"
import style from "../Prueba/Prueba.module.css"


const Prueba = () => {

    // const [page, setPage] = useState(1);
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const handleScroll = event =>{
    //     const {scrollTop, clientHeight, scrollHeight} = event.currentTarget;
    //     if(scrollHeight - scrollTop === clientHeight){
    //         setPage(prev => prev + 1)
    //     }
    // }

    // useEffect(() =>{
    //     const loadUser = async () => {
    //         setLoading(true);
    //         const newUsers = await getUsers(page);
    //         setUsers(prev => [...prev, ...newUsers]);
    //         setLoading(false);
    //     }
    //     loadUser();
    // }, [page])

    return (
        <div className={style.container}>
            {/* <div>
                {users && users.map(user => <Card key={user.id} user={user}/>)}
            </div>
            {loading && <div><p>Loading ...</p></div>} */}
            <div className={style.userContainer}>
                <div className={style.flex}>
                <Card></Card>
                </div>
                <div className={style.flex}>
                <Card></Card>
                </div>
                <div className={style.flex}>
                <Card></Card>
                </div>
                <div className={style.flex}>
                <Card></Card>
                </div>
                <div className={style.flex}>
                <Card></Card>
                </div>
                <div className={style.flex}>
                <Card></Card>
                </div>
                <div className={style.flex}>
                <Card></Card>
                </div>
                <div className={style.flex}>
                <Card></Card>
                </div>
                <div className={style.flex}>
                <Card></Card>
                </div>
                <div className={style.flex}>
                <Card></Card>
                </div>
            </div>
        </div>
    )
}

export default Prueba