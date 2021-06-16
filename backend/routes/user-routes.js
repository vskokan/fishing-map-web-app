module.exports = (app) => {
  const router = require("express").Router();
  const multer = require("../configs/multer.js");
  const user = require("../controllers/user-controller.js");
  const sessions = require("../controllers/user-session-controller");
  const discount = require("../controllers/discount-controller.js");
  const au = require("../controllers/au-controller");

  app.use("/api/users", router);

  router.post("/", au.verify, multer.upload.none(), user.create);
  router.get("/", user.readAll);
  router.get("/:login", user.readOne);
  router.put("/:login", au.verify, multer.upload.single("avatar"), user.update);
  router.delete("/:login", au.verify, user.deleteByLogin);

  router.post(
    "/changepassword",
    au.verify,
    multer.upload.none(),
    user.updatePassword
  );

  router.get("/:login/sessions", sessions.readUserSessions);
  router.delete("/:login/sessions/:sessionId", sessions.deleteUserSession);

  router.get("/:login/discounts", discount.getUserDiscounts);
  router.post('/ban/:login', multer.upload.none(), user.ban)
};
