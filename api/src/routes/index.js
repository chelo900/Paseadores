const { Router } = require('express');

const paseadores = require("./get_detail");


const router = Router();

router.use("/paseadores", paseadores);


module.exports = router;