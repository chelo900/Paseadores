const { Router } = require("express");
const { User } = require("../db");
const nodemailer = require("nodemailer");
const transporter = require("./mailer")

const router = Router();

router.put("/", async (req, res) => {
    const {email} = req.body
    if(!email){
        res.status(400).send({message: "email requerido"});
    }
    
    try{  
        const paseador = await User.findOne({
            where: {
                email: email
            }
        })
        const verificaciónLink = `http://localhost:3000/new-password/${paseador.name}`
        try{
        let info = await transporter.sendMail({
            from: '"Cambio Contraseña 👻" <paseadorescuidadores@gmail.com>', // sender address
            to: paseador.email, // list of receivers
            subject: "Recuperacion contraseña", // Subject line
            html: `<b>Ingresá al siguiente link para recuperar la contraseña</b>
            <a href="${verificaciónLink}">${verificaciónLink}</a>`
          });
          }
          catch(error){
             return console.log(error)
          }

        res.status(200).send(verificaciónLink);
    }catch{
        res.status(500).send("No se pudo enviar el mail");
    }
});

module.exports = router;