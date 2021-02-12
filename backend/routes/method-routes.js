module.exports = app => {
    const method = require("../controllers/method-controller.js");
    let router = require("express").Router();
    app.use('/api/methods', router);

    const multer = require("../configs/index.js")
    const au = require('../au/au-handlers')

    router.post("/", au.verify, multer.upload.none(), method.create);
    router.get("/", method.readAll);
    router.get("/:id", method.readOne);
    router.post("/update", au.verify, multer.upload.none(), method.update); //Переписать на put!
    router.delete("/:id", au.verify, method.deleteById);
    router.delete("/", au.verify, method.deleteAll);
}