module.exports = app => {
    const geo = require("../controllers/geo-controller.js");
    let router = require("express").Router();
    app.use('/api/geo', router);

    const multer = require("../configs/index.js")
    const au = require('../au/au-handlers')

    /* Страны */

    router.post("/countries/", au.verify, multer.upload.none(), geo.createCountry);
    router.get("/countries/", geo.readAllCountries);
    
   // router.get("/:id", place.readOne);
   // router.put("/:id", au.verify, multer.upload.none(), place.update);
    // router.post("/update", place.update);
    //router.delete("/:id", au.verify, place.deleteById);
    //router.delete("/", place.deleteAll);
}