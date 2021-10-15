const { Router } = require("express");
const { User } = require("../db");
const Stripe = require("stripe");
const { STRIPE } = process.env;

const stripe = new Stripe(STRIPE)

const router = Router();

router.post("/", async (req, res) => {

    try {
        const { id, amount, email  } = req.body;
        const pago = await stripe.paymentIntents.create({
            amount, 
            currency : "USD",
            description : "Cuenta Premium",
            payment_method : id,
            confirm : true
        })

    if (pago) {
        try {
            const usuario = await User.findOne({
                where: {
                email: email,
                },
        });
            usuario.premium = true
            usuario.save()

            res.status(200).send({mensaje : "Pago Exitoso"});

            } catch (error){
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
        res.json({mensaje : error.raw.message})
    }  
})

module.exports = router;
