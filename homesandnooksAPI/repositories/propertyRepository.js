const Property = require("../models/PropertySchema");
const Repo = require('./template');



const PropertyRepository = new Repo(Property);


module.exports = PropertyRepository;