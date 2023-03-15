

class Repo {
    constructor(Model){
        this.Model = Model;
    }

    save = async (itemDetails) =>{
        const newItem = new this.Model({
            ...itemDetails
        });
        try{
            const savedItem = await newItem.save();
            return savedItem;
        }catch(err){
            throw err;
        }
    }

    filter = async (params) =>{
        try{
            const items = await this.Model.find(params);
            return items
        }catch(err){
            throw err
        }  
    }

    search = async (queries) => {
        const {min, max, ...others} = queries;
        try{
            const items = await this.Model.find(others).where("price").gte(min || 0).lte(max || Infinity);
            return items
        }catch(err) {
            throw err
        }
    }

    findItemAndUpdateArray = async (id, itemToAdd) => {
        try{
            const updatedItem = await this.Model.findByIdAndUpdate(id, 
                {"$push": itemToAdd},
                {"new": true});

            return updatedItem;
        }catch(err){
            throw err;
        }
    }

    update = async (id, updates) =>{
        try{ 
            const updatedUser = await this.Model.findByIdAndUpdate(id, 
                {"$set": updates},
                {"new": true});  

            return updatedUser;
        }catch (err) {
            throw err
        }
    }
}

module.exports = Repo;