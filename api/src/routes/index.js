const { Router } = require('express');
const paseadores = require("./paseadores");

const router = Router();

router.use("/paseadores", paseadores);

module.exports = router;