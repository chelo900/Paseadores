import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import { Link, useParams } from 'react-router-dom'
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if (!error) {
            const { id } = paymentMethod;
            const { data } = await axios.post("/updatePremium", {
                id,
                amount: 200,
                email: user.email
            })
            console.log("hola", data)
        }
    }

    return (
        <form onSubmit={handleSubmit}  >
            <h2 className={style.subTitle}>
                Ingrese los datos de su tarjeta
            </h2>
            <div className={style.datosForm}>
                <CardElement />
            </div>
            <div className={style.containerBnt}>
                <button className={style.btn}> Pagar </button>
            </div>
        </form>
    )
}

function Premium() {
    return (
        <div className={style.container}>
            <div className={style.principal}>
                <h2 className={style.title}> Premium </h2>
                <Elements stripe={stripePromise} >
                    <Form />
                </Elements>
                <div className={style.info}>
                    <p className={style.infoTitle} >Contratando la cuenta premium a tan solo USD$2 por unica vez vas a poder contar con los siguientes beneficios exclusivos:</p>
                    <div className={style.beneficios}>
                        <p className={style.bene} >- Mejor posicionamiento.</p>
                        <p className={style.bene} >- Subir ilimitadas publicaciones de tu trabajo.</p>
                        <p className={style.bene} >- Mantener simpre el historial de los chats con los clientes.</p>
                    </div>
                </div>
                <div>
                    {/* <Link to={`/walker/perfil/${user.id}`}>
                        <p>Volver</p>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Premium;
