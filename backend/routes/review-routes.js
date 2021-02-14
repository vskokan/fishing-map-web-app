module.exports = app => {
    const review = require("../controllers/review-controller.js");
    let router = require("express").Router();

    const multer = require("../configs/index.js")

    app.use('/api/reviews', router);

    router.post("/", multer.upload.none(), review.createWithPromises);
    router.get("/", review.readAll);
    router.get("/:id/photos", review.getPhotos);
    router.get("/options", review.getOptions)
    //router.get("/:id", fishes.findOne);
    router.put("/:id", multer.upload.none(), review.update);
    router.delete("/:id", review.delete);
    //router.delete("/", fishes.deleteAll);
}