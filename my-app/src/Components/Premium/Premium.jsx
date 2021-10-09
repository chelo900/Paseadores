import React, {useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import { useParams } from 'react-router-dom'
import { getPaseadorForId } from '../../actions/index'
import style from './Premium.module.css'


const stripePromise = loadStripe("pk_test_51Ji5fMGdSvtdCP45ybVuEagcWsHbTdQPRvOmX3HX4i3qLK69ougjRbSjEYQCZCVCZ9J0WO6o7jc1ZFs80MR1pyZF00yadaq1Sb")

const Form = () => {

const stripe = useStripe()
const elements = useElements()

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPaseadorForId(id))
    }, [dispatch])

    const user = useSelector((state) => state.detailWalker)
    console.log("hola", user)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type : "card",
            card : elements.getElement(CardElement)
        })
        if (!error) {
            const { id } = paymentMethod;
            const { data } = await axios.post("/updatePremium", {
                id, 
                amount : 200,
                email : user.email
            })
            console.log("hola", data)
        }
    }

    return (
    <form onSubmit = {handleSubmit} >
        <h2 className = {style.titulo}>
            Cuenta Premium 
        </h2>
        <div className = {style.datosForm}>
            <CardElement/>
        </div>
        <button className = {style.btn}> Pagar </button>
    </form>
    )
}

function Premium () {
    return(
        <div className = {style.conteiner}>
            <Elements stripe={stripePromise} >
                <Form/>
            </Elements> 
        <div className = {style.info}>
            <p className = {style.uno} >Contratando la cuenta premium a tan solo USD$2 por mes vas a poder contar con beneficios exclusivos.</p>
            <p className = {style.dos} >Los beneficios son los siguientes: </p>
            <p className = {style.tres} > Permanecer simpre en la primera pagina.</p>
            <p className = {style.cuatro} > Subir ilimitadas publicaciones de tu trabajo.</p>
            <p className = {style.cinco} > Mantener simpre el historial de los chats con los clientes.</p>
        </div>
        </div>
    )
}

export default Premium;
