import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {   // name, mobile, email, coordinates(latitude, longitude), password, time_of_registration

        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,   
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
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        time_of_registration: {
            type: Date,
            default: Date.now,
        }

    }, {timestamps: true}  // createdAt, updatedAt
);



export const User = mongoose.model("User", userSchema);