module.exports = app => {
    const fish = require("../controllers/fish-controller.js");
    let router = require("express").Router();
   
    const multer = require("../configs/multer.js")
    const au = require('../controllers/au-controller')
    app.use('/api/fish', router);

    router.post("/", au.verify, multer.upload.single("image"), fish.create);
    router.get("/", fish.readAll);
    router.get("/pag/", fish.findAllPagination);

    router.get("/:id", fish.getOne);
    router.put("/:id", au.verify, multer.upload.single("image"), fish.update);
    router.delete("/:id", au.verify, fish.deleteById);
}