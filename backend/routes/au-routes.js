const au = require("../controllers/au-controller.js");
var express = require("express");
var router = express.Router();
const multer = require("../configs/multer.js");

router.post("/login", multer.upload.none(), au.login);
router.post("/verify", multer.upload.none(), au.verify);
router.post("/register", multer.upload.none(), au.register);
router.post("/logout", multer.upload.none(), au.logout);

module.exports = router;
