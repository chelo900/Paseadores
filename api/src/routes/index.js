const { Router } = require("express");
const get_details = require("./get_details");
const postUser = require("./postUser");
const putDetailsUser = require ("./putDetailsUser")
const putDetailsProfile = require ("./putDetailsProfile")
const get_paseadores = require("./get_paseadores");
const getByEmail = require ("./getByEmail")
const get_horarios = require ("./get_horarios")
const putHorarios = require ("./putHorarios")
const get_ubication = require ("./get_ubication")
const postImages = require ("./postImages")

const router = Router();

router.use("/walkers", get_details);
router.use("/walkers", get_paseadores);
router.use("/walkers", postUser);
router.use("/wlakers", putDetailsUser)
router.use("/walkers", putDetailsProfile)
router.use("/walkers", getByEmail)
router.use("/walkers", get_horarios)
router.use("/walkers", putHorarios)
router.use("/walkers", get_ubication)
router.use("/walkers",postImages)

module.exports = router;
