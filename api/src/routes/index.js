const { Router } = require("express");
const get_details = require("./get_details");
const postUser = require("./postUser");
const router = Router();

router.use("/walkers", get_details);
router.use("/createUser", postUser);

module.exports = router;
