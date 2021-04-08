module.exports = (app) => {
  const geo = require("../controllers/geo-controller.js");
  let router = require("express").Router();
  app.use("/api/geo", router);

  const multer = require("../configs/multer.js");
  const au = require("../controllers/au-controller");

  /* Страны */

  router.post(
    "/countries/",
    au.verify,
    multer.upload.none(),
    geo.createCountry
  );
  router.get("/countries/", geo.readAllCountries);
  router.put("/countries/:id", au.verify, multer.upload.none(), geo.updateCountry)
  router.delete("/countries/:id", au.verify, multer.upload.none(), geo.deleteCountry)

  router.post("/regions/", au.verify, multer.upload.none(), geo.createRegion);
  router.get("/regions/", geo.readAllRegions);
  router.put("/regions/:id", multer.upload.none(), geo.updateRegions);
  router.delete("/regions/:id", geo.deleteRegion)

  router.post(
    "/locations/",
    au.verify,
    multer.upload.none(),
    geo.createLocation
  );
  router.get("/locations/", geo.readAllLocations);
  router.delete("/locations/:id", geo.deleteLocation);
  router.put("/locations/:id", multer.upload.none(), geo.updateLocation);

  // router.get("/:id", place.readOne);
  // router.put("/:id", au.verify, multer.upload.none(), place.update);
  // router.post("/update", place.update);
  //router.delete("/:id", au.verify, place.deleteById);
  //router.delete("/", place.deleteAll);
};
