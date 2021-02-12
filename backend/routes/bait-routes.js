module.exports = app => {
    const bait = require("../controllers/bait-controller.js");
    let router = require("express").Router();
    app.use('/api/baits', router);

    const multer = require("../configs/index.js")
    const au = require('../au/au-handlers')

    router.post("/", multer.upload.none(), au.verify, bait.create);
    router.get("/", bait.readAll);
    router.get("/:id", bait.readOne);
    router.post("/update", au.verify, multer.upload.none(), bait.update);
    router.delete("/:id", au.verify, bait.deleteById);
    router.delete("/", bait.deleteAll);
}