import {Inventory} from '../models/inventory.model.js'


const createInventory = async(req, res)=>{
    // steps to create inventory
    // 1. take details from invent
    // 2. check existance
    // 3. save in db 
    // 4. check and response inventory without password


    try {
        // 1.
        const {name, capacity, coordinates} = req.body;
        const {latitude, longitude} = coordinates || {};
    
    
        // 2.
        const existingData = await Inventory.findOne(
            {name}
        )
    
        if(existingData){ 
            return res.send("Inventory already exists!")
        }
    
    
    
        // 3.
        const inventoryData = await Inventory.create({
            name, 
            capacity, 
            coordinates: {latitude, longitude},
        })
    
    
        // 4.
        const createdInventory = await Inventory.findById(inventoryData._id).select("-pasword")
    
        if(!createdInventory){
            res.send("Inventory can't created!");
        }
    
        console.log(`Inventory created successfully! \n ${createdInventory}`);
        res.send(`Inventory created successfully!`);
    
    
    } catch (error) {
        console.log(`Error in createInventory! \n ${error}`)
        res.send(`Error in createInventory! \n ${error}`)
    }

}




const allInventory = async(req, res)=>{
    try {
        const allData = await Inventory.find({})
        res.send(allData)
    } catch (error) {
        res.send(`Error in showing blogs! \n ${error}`)
    }
}





const updateInventory = async(req, res)=>{
    try {
        const {name, capacity, coordinates} = req.body;
        const {longitude, latitude} = coordinates || {};
        const upInventory = await Inventory.updateOne({name}, { $set: {name: name, capacity: capacity, latitude: latitude, longitude: longitude }})
        console.log(`Inventory update successfully! \n ${upInventory}`);
        res.send(`Inventory update successfully!`);
    } catch (error) {
        console.log(`Error in update inventory. \n ${error}`);
        res.send(`Error in update inventory.`)
    }
}



const deleteInventory = async(req, res)=>{
    try {
        const {name} = req.body;
        const deleteData = await Inventory.deleteOne({name});
        res.send(`Data deleted successfully! \n ${deleteData}`)
    } catch (error) {
        res.send(`Error in delete Inventory \n ${error}`);
    }
}









export {createInventory, allInventory, updateInventory, deleteInventory}