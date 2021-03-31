module.exports = app => {
    const department = require("../controllers/department-controller.js");
    let router = require("express").Router();
   
    const multer = require("../configs/multer.js")
    const au = require('../controllers/au-controller')
    //app.use(multer({storage:storageConfig}).single("image", "avatar"));
    // app.use(multer({storage:storageConfig}).array("image"));
    

    app.use('/api/department', router);

    router.post("/",  multer.upload.none(), department.create);
    // router.get("/", fish.findAll);
    router.get("/", department.readAll);
    //router.get("/pag/", fish.findAllPagination);
    // router.post("/test/", fish.parse);
    //router.post("/test/", upload.single('image'), fish.parse);

    //router.get("/:id", fish.getOne);
    //router.put("/:id", au.verify, multer.upload.single("logo"), fish.update);
    //router.delete("/:id", au.verify, fish.deleteById);
    //router.delete("/", fishes.deleteAll);
}