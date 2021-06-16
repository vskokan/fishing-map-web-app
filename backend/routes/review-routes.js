module.exports = (app) => {
  const review = require("../controllers/review-controller.js");
  const discount = require("../controllers/discount-controller.js");
  const au = require("../controllers/au-controller");

  const router = require("express").Router();
  const multer = require("../configs/multer.js");

  app.use("/api/reviews", router);

  router.post(
    "/",
    //au.verify,
    multer.upload.array("images", 5),
    review.create,
    discount.checkUserDiscounts,
    discount.generateDiscount
  );
  router.get("/", review.getAll);
  router.get("/:id/photos", review.getPhotos);
  router.get("/options", review.getOptions);
  router.get("/:id", review.getFull);
  router.delete("/:id", review.delete);
  router.post(
    "/:id/stats",
    //au.verify,
    multer.upload.none(),
    review.changeStats
  );
};
