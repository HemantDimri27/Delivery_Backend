import mongoose from "mongoose";



const inventorySchema = mongoose.Schema({
    // name, capacity, coordinates
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
})


export const Inventory = mongoose.model("Inventory", inventorySchema)