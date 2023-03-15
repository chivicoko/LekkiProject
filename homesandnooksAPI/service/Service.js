const resolveRepo = require('../helpers/resolveRepo');
const {cloudinary} = require('../config/cloudinaryConfig');

const Service = (targetRepo) =>{
    const repository = resolveRepo(targetRepo);
    const saveItem = async (itemDetails) => {
        try{
            const savedItem = await repository.save(itemDetails);
            return savedItem;
        }catch(err){
            throw err;
        }
    }

    const updateImageArray = async (itemId, file) => {
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
            const filename = cloudinaryResponse.public_id;
            const path = cloudinaryResponse.secure_url;
            const {destination, ...others} = file;
            const image = {...others, path, filename};
            await repository.findItemAndUpdateArray(itemId, {images: image});
            return image;
        }catch(err) {
            throw err;
        }
        
    }

    const queryItem = async (params, queries) => {
        let foundItems = [];
        try{
            if (params.id) {
                // console.log("params", params);
                foundItems = await repository.filter({_id: params.id});
            }else if (Object.keys(queries).length === 0) {
                // console.log("all", queries);
                foundItems = await repository.filter(queries);
            }else {
                Object.keys(queries).forEach(q => {
                    queries[q].trim() === "" && delete queries[q];
                });
                if (Object.keys(queries).length === 0){
                    // console.log("all", queries);
                    foundItems = await repository.filter(queries);
                }else {
                    // console.log("q", queries);
                    foundItems = await repository.search(queries);
                }
                
            }
            return foundItems;
        }catch(err){
            throw err;
        }
    }

    const updateItem = async (itemId, updates, user) => {
        const property = await queryItem({id: itemId}, {});
        console.log("user", property[0].uploader === user.id);
        if (property.length > 0) {
            if (property[0].uploader === user.id || user.roles.some(role => ["app-admin", "admin", "Admin"].includes(role))){
                const arr = ["bedroom", "sittingRoom", "kitchen", "bathroom", "toilet", "description", "validTo"];
                Object.keys(updates).forEach(u => {
                    !arr.includes(u) && delete updates[u];
                    updates[u].trim() === "" && delete updates[u];
                });
                console.log(updates);
                try{
                    const updatedItem = await repository.update(itemId, updates);
                    return updatedItem;
                }catch(err) {
                    throw err;
                }
                
            }else {
                throw {message:{message: 'You are not permitted to update this property.'}};
            }
        }
    }

    return {
        saveItem,
        updateImageArray,
        queryItem,
        updateItem
    }
}


module.exports = Service;