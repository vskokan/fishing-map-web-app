module.exports = app => {
    const district = require("../controllers/district-controller.js");
    let router = require("express").Router();
    app.use('/api/districts', router);

    const multer = require("../configs/multer.js")
    const au = require('../controllers/au-controller')

    router.post("/", au.verify, multer.upload.none(), district.create);
    router.get("/", district.readAll);
    router.get("/:id", district.readOne);
    router.put("/:id", au.verify, multer.upload.none(), district.update);
    // router.post("/update", district.update);
    router.delete("/:id", au.verify, multer.upload.none(), district.deleteById);
    router.delete("/", district.deleteAll);
}