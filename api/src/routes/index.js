const { Router } = require("express");
const get_details = require("./get_details");
const postUser = require("./postUser");
const putDetailsUser = require("./putDetailsUser");
const putDetailsProfile = require("./putDetailsProfile");
const get_paseadores = require("./get_paseadores");
const login = require("./login");
const putHorarios = require("./putHorarios");
const postImages = require("./postImages");
const forgotPassword = require ("./forgotPassword")
const newPassword = require ("./newPassword")
const get_horarios = require ("../routes/FilterOrder/get_horarios")
const get_ubication = require ("../routes/FilterOrder/get_ubication")
const get_price = require ("../routes/FilterOrder/getPrice")
const get_order = require ("../routes/FilterOrder/getOrder")
const get_service = require ("../routes/FilterOrder/getService")
const postClient = require ("./Client/postClient")
<<<<<<< HEAD
<<<<<<< HEAD
const putClientePerfil = require ("../routes/Client/putClientePerfil")
const putCliente = require ("../routes/Client/putClient")
const detailsClient = require("../routes/Client/getDetailsCliente")
=======
// const putCliente = require ("../routes/Client/putCliente")
>>>>>>> 0dd0c56 (.)
=======
const putClientePerfil = require ("../routes/Client/putClientePerfil")
const putCliente = require ("../routes/Client/putClient")
const detailsClient = require("../routes/Client/getDetailsCliente")
>>>>>>> 3c20baa (.)

const router = Router();

router.use("/walkers", get_details);
router.use("/allActiveWalkers", get_paseadores);
router.use("/createUser", postUser);
router.use("/updateuser", putDetailsUser);
router.use("/updateuserProfile", putDetailsProfile);
router.use("/login", login);
router.use("/walkers", get_horarios);
router.use("/walkers", putHorarios);
router.use("/ubication", get_ubication);
router.use("/", get_price)
router.use("/", get_order)
router.use("/", get_service)
router.use("/postimages", postImages);
router.use("/forgotPassword",forgotPassword);
router.use("/newPassword", newPassword);
router.use("/createClient", postClient);
<<<<<<< HEAD
<<<<<<< HEAD
router.use("/updateClientProfile", putClientePerfil);
router.use("/updateCliente", putCliente);
router.use("/Cliente", detailsClient);
=======
// router.use("/updatecliente", putCliente);

>>>>>>> 0dd0c56 (.)
=======
router.use("/updateClientProfile", putClientePerfil);
router.use("/updateCliente", putCliente);
router.use("/Cliente", detailsClient);
>>>>>>> 3c20baa (.)

module.exports = router;
