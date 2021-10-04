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

const router = Router();

router.use("/walkers", get_details);
router.use("/allActiveWalkers", get_paseadores);
router.use("/createUser", postUser);
router.use("/updateuser", putDetailsUser)
router.use("/updateuserProfile", putDetailsProfile)
router.use("/email", getByEmail)
router.use("/walkers", get_horarios)
router.use("/walkers", putHorarios)
router.use("/ubication", get_ubication)


module.exports = router;
