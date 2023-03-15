// const {dataUri} = require('../config/imageSaveConfig');
// const {uploader} = require('../config/cloudinaryConfig');



const PropertyController = (serviceContainer, helpers) =>{
    const addProperty = async (req, res) => {
        try{
           
            const property = await serviceContainer.saveItem(req.body);
            const response = helpers.constructResponse(property, "Property added successfully", "create");
            // console.log(req.kauth.grant);
            res.status(201).json(response);
        }catch(err){
            res.send({"error":err});
        }
    }

    const addPropertyImage = async (req, res) => {
        try{
            // console.log(req.file);
            const image = await serviceContainer.updateImageArray(req.body.id, req.file);
            const response = helpers.constructResponse(image, "image uploaded succesfully");
            res.status(200).json(response);
        }catch(err){
            res.send({"error": err});
        }
    }

    const getProperty = async (req, res) => {
        try{
            const property = await serviceContainer.queryItem(req.params, req.query);
            const response = helpers.constructResponse(property, "fetched all properties");
            res.status(200).json(response);
            
            
        }catch (err){
            res.send({"error": err});
        }
    }

    const updateProperty = async (req, res) => {
        try{
            
            const user = {id: req.kauth.grant.access_token.content.preferred_username,
                        roles: req.kauth.grant.access_token.content.roles};
            const updatedProperty = await serviceContainer.updateItem(req.params.id, req.body, user);
            const response = helpers.constructResponse(updatedProperty, `property with id ${req.params.id} updated successfully`);
            res.status(200).json(response);
        }catch(err){
            res.send({"error": err.message});
        }
    }


    return {
        addProperty,
        addPropertyImage,
        getProperty,
        updateProperty
    }
}


module.exports = PropertyController;