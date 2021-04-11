module.exports = app => {
    const plan = require("../controllers/plan-controller.js");
    let router = require("express").Router();
    app.use('/api/plans', router);

    const multer = require("../configs/multer.js")
    const au = require('../controllers/au-controller')

    router.post("/", multer.upload.none(), au.verify, plan.create);
    router.get("/", plan.read);
    router.put("/:id", au.verify, multer.upload.none(), plan.update);
    router.delete("/:id", au.verify, plan.delete);
}