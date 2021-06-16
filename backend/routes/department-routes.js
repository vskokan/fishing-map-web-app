module.exports = app => {
    const department = require("../controllers/department-controller.js");
    let router = require("express").Router();
   
    const multer = require("../configs/multer.js")
    const au = require('../controllers/au-controller')

    app.use('/api/department', router);

    router.post("/",  multer.upload.none(), department.create);
    router.get("/", department.readAll);

}