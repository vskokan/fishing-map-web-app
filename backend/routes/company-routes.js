module.exports = app => {
    const company = require("../controllers/company-controller.js");
    const department = require("../controllers/department-controller.js");

    let router = require("express").Router();
   
    const multer = require("../configs/multer.js")
    const au = require('../controllers/au-controller')
    

    app.use('/api/company', router);

    router.post("/",  multer.upload.single("logo"), company.create);
    router.get("/", company.readAll);
    router.put("/:id", multer.upload.single("logo"), company.update)
    router.delete("/:id", company.delete)

    router.get("/:id/departments", company.readDepartments);
    router.post("/:id/departments", department.create)
    router.post('/partnership', multer.upload.none(), company.sendPartnershipRequest)
}