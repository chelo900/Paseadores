const { Router } = require("express");
const router = Router();
const postWalker = require("./postWalker");

router.use("/createUser", postWalker);

module.exports = router;
