// module.exports = app => {
//     const au = require("./au-handlers.js");
    
//     let router = require("express").Router();

//     const multer = require("../configs/multer.js")

//     app.use('/api/au', router);

//     router.post('/login', multer.upload.none(), au.verify, au.login)

//     // router.post("/", multer.upload.none(), fact.create);
//     // router.get("/", fact.readAll);
//     //router.get("/:id", fishes.findOne);
//     // router.put("/:id", multer.upload.none(), fact.update);
//     // router.delete("/:id", multer.upload.none(), fact.deleteById);
//     //router.delete("/", fishes.deleteAll);
// }

const au = require("../controllers/au-controller.js")
var express = require('express')
var router = express.Router()
const multer = require("../configs/multer.js")

router.post('/login', multer.upload.none(), au.login)
router.post('/verify', multer.upload.none(), au.verify)
router.post('/register', multer.upload.none(), au.register)
router.post('/logout', multer.upload.none(), au.logout)

module.exports = router