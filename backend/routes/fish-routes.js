module.exports = app => {
    const fish = require("../controllers/fish-controller.js");
    let router = require("express").Router();
   
    const multer = require("../configs/index.js")
    const au = require('../au/au-handlers')
    //app.use(multer({storage:storageConfig}).single("image", "avatar"));
    // app.use(multer({storage:storageConfig}).array("image"));
    

    app.use('/api/fish', router);

    router.post("/", au.verify, multer.upload.single("image"), fish.create);
    // router.get("/", fish.findAll);
    router.get("/", fish.readAll);
    router.get("/pag/", fish.findAllPagination);
    // router.post("/test/", fish.parse);
    //router.post("/test/", upload.single('image'), fish.parse);

    //router.get("/:id", fishes.findOne);
    router.put("/:id", au.verify, multer.upload.single("image"), fish.update);
    router.delete("/:id", au.verify, fish.deleteById);
    //router.delete("/", fishes.deleteAll);
}