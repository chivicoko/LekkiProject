const propertyRepository = require('../repositories/propertyRepository');



const resolveRepo = (item) =>{
    if(item === "property") {
        return propertyRepository;
    }
}

module.exports = resolveRepo;