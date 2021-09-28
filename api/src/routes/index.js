const { Router } = require('express');
const axios = require("axios").default;
const {Walker } = require('../db')

const router = Router();

router.get("/Paseador/:id", async (req, res) => {
    const {id} = req.params.id
    try{  
            const datos = await Walker.findByPk(id)
            const detallesDatos = {name : datos.name, surname: datos.surname} 
            res.status(200).send(detallesDatos);
        }
    catch (error) {
        if (error.response?.status === 404) {
          res.status(404).send("No se encontró al paseador");
        } else res.status(500).send("Ecurrió un error");
      }
    });