module.exports = app => {
    const company = require("../controllers/company-controller.js");
    let router = require("express").Router();
   
    const multer = require("../configs/multer.js")
    const au = require('../controllers/au-controller')
    //app.use(multer({storage:storageConfig}).single("image", "avatar"));
    // app.use(multer({storage:storageConfig}).array("image"));
    

    app.use('/api/company', router);

    router.post("/",  multer.upload.single("logo"), company.create);
    // router.get("/", fish.findAll);
    router.get("/", company.readAll);
    //router.get("/pag/", fish.findAllPagination);
    // router.post("/test/", fish.parse);
    //router.post("/test/", upload.single('image'), fish.parse);

    //router.get("/:id", fish.getOne);
    //router.put("/:id", au.verify, multer.upload.single("logo"), fish.update);
    //router.delete("/:id", au.verify, fish.deleteById);
    //router.delete("/", fishes.deleteAll);
}