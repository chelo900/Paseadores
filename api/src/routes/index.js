const { Router } = require("express");
const get_details = require("./get_details");
const postUser = require("./postUser");
const putDetailsUser = require ("./putDetailsUser")
const router = Router();

router.use("/walkers", get_details);
router.use("/createUser", postUser);
router.use("/updateuser", putDetailsUser)

module.exports = router;
