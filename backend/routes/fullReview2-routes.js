module.exports = app => {
    const review = require("../controllers/fullReview2-controller.js");
    const discount = require("../controllers/discount-controller.js");
    const router = require("express").Router();

    const multer = require("../configs/multer.js")


    app.use('/api/test/reviews', router);

    router.post("/", multer.upload.array("images", 5), review.create,  discount.checkUserDiscounts);
    // router.post("/changepassword", multer.upload.none(), user.updatePassword);
    router.get("/", multer.upload.none(), review.getAll);
    // router.get("/:login", multer.upload.none(), user.readOne);
    // router.put("/:login", multer.upload.single("avatar"), user.update);
    // router.delete("/:login", multer.upload.none(), user.deleteByLogin);
}