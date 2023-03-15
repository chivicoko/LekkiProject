const router = require('express').Router();
const {keycloak} = require('../config/keycloakConfig');
const PropertyController = require('../controllers/propertyController');
const Service = require('../service/Service');
const constructResponse = require('../helpers/constructResponse');
// const upload = require("../config/imageSaveConfig");

const propertyService = Service("property");
const propertyController = PropertyController(propertyService, {constructResponse});


router.get("/property/:id?", propertyController.getProperty);
router.post("/property", keycloak.protect(), propertyController.addProperty);
router.put("/property/:id", keycloak.protect(), propertyController.updateProperty);
router.post("/upload", keycloak.protect(), propertyController.addPropertyImage)





module.exports = router;
    