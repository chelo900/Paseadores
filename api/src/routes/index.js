const { Router } = require("express");
//const { Administrator} = require("../db");
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
const get_ubication = require ("../routes/FilterOrder/get_ubication")
const postClient = require ("./Client/postClient")
const putClientePerfil = require ("../routes/Client/putClientePerfil")
const putCliente = require ("../routes/Client/putClient")
const detailsClient = require("../routes/Client/getDetailsCliente")
const sendOrden = require ("./sendOrden")
const getOrden = require ("./getOrden")
const answerOrden = require("./answerOrden")
const postPremium = require("./postPremium")
const getWalkers = require("../routes/Administrator/getWalkers")
const getClients = require("../routes/Administrator/getClients")
const makeAdmin = require("../routes/Administrator/makeAdmin")
const deleteUserAccount = require("../routes/Administrator/deleteUserAccount")
const resetPassword = require("../routes/Administrator/resetPassword")
const firstAdmin = require("../routes/Administrator/firstAdmin")
const addFavorite =require("./addFavorite")
const getFavorite = require("./getFavorite")
const deleteFavorite =require("./deleteFavorite")
const preference = require("./preference")
const getPreferences = require("./getpreferences")


const router = Router();

router.use("/walkers", get_details);
router.use("/allActiveWalkers", get_paseadores);
router.use("/createUser", postUser);
router.use("/updateuser", putDetailsUser);
router.use("/updateuserProfile", putDetailsProfile);
router.use("/login", login);
router.use("/walkers", putHorarios);
router.use("/ubication", get_ubication);
router.use("/postimages", postImages);
router.use("/forgotPassword",forgotPassword);
router.use("/newPassword", newPassword);
router.use("/createClient", postClient);
router.use("/updateClientProfile", putClientePerfil);
router.use("/updateCliente", putCliente);
router.use("/Cliente", detailsClient);
router.use("/sendOrden", sendOrden)
router.use('/getOrden', getOrden)
router.use('/ordenAnswer', answerOrden)
router.use("/updatePremium", postPremium);
router.use("/getWalkers", getWalkers);
router.use("/getClients", getClients);
router.use("/makeAdmin", makeAdmin);
router.use("/deleteUserAccount", deleteUserAccount);
router.use("/resetPassword", resetPassword);
router.use("/firstAdmin", firstAdmin);
router.use("/sendPreferencias", preference)
router.use("/getpreferences", getPreferences)


router.use('/addFav', addFavorite)
router.use('/favs', getFavorite);
router.use('/quitFav',deleteFavorite);



module.exports = router;