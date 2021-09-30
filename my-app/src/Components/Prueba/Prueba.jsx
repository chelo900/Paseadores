import React, { useState, useEffect } from "react";
import { getAllPaseadores } from "../../actions";
import Card from "../Card/Card"
import style from "../Prueba/Prueba.module.css"
import { useDispatch,useSelector } from "react-redux";

const Prueba = () => {

    const dispatch = useDispatch();
    const allWalker = useSelector((state) => state.allPaseadores)

    const [page, setPage] = useState(1);
    const [users, setUsers] = useState(allWalker);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        dispatch(getAllPaseadores(page))
    },[])

    const handleScroll = event => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            setPage(prev => prev + 1)
        }
    }

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            setUsers(prev => [...prev, ...users]);
            setLoading(false);
        }
        loadUser();
    }, [page])

    return (
        <div className={style.container}>
            <div className={style.userContainer} onScroll={handleScroll}>
                {users && users.map(user =>
                    <div className={style.flex}>
                        <Card key={user.id} user={user} />
                    </div>)}
            </div>
            {loading && <div><p>Loading ...</p></div>}
        </div>
    )
}

export default Prueba