module.exports = app => {
    const place = require("../controllers/place-controller.js");
    let router = require("express").Router();
    app.use('/api/places', router);

    const multer = require("../configs/index.js")
    const au = require('../au/au-handlers')

    router.post("/", au.verify, multer.upload.none(), place.create);
    router.get("/", place.readAll);
    router.get("/:id", place.readOne);
    router.put("/:id", au.verify, multer.upload.none(), place.update);
    // router.post("/update", place.update);
    router.delete("/:id", au.verify, place.deleteById);
    //router.delete("/", place.deleteAll);
}