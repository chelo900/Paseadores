const { Router } = require("express");
const get_details = require ("./get_details")

const router = Router();

router.use("/walkers", get_details);

module.exports = router;