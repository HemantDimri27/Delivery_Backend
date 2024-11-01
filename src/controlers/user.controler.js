import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createToken } from "../utilities/jwtUtilities.js";
import { DateTime } from 'luxon';


const createUser = async(req, res)=>{
    // steps to register user
    // 1. take details from user
    // 2. check existance
    // 3. save in db 
    // 4. check and response user without password


    try {
        // 1.
        const {name, mobile, email, coordinates, password } = req.body;

        const {latitude, longitude} = coordinates || {};

        const hashedPassword = await bcrypt.hash(password, 10);
    
    
        // 2.
        const existingData = await User.findOne(
            {$or: [{mobile}, {email}]}
        )
    
        if(existingData){ 
            return res.send("User already exists!")
        }
    
    
    
        // 3.
        const userdata = await User.create({
            name,
            mobile, 
            email, 
            coordinates: {latitude, longitude},
            email,
            password : hashedPassword,
        })
    
    
        // 4.
        const createdUser = await User.findById(userdata._id).select("-pasword")
    
        if(!createdUser){
            res.send("User can't created!");
        }

        const token = createToken({ email });
        console.log(`User created successfully! \n ${createdUser} \n ${token}`);
        res.send(`User created successfully!`);
    
    
    } catch (error) {
        console.log(`Error in create User! \n ${error}`)
        res.send(`Error in create User!`)
    }

}





const loginUser = async(req, res) => {

    // steps for login user
    // 1. take details from user
    // 2. match the details
    // 3. response confirm



    try {
        // 1.
        const {email, password} = req.body
    
    
    
        // 2. 
        const userData = await User.findOne(
            {email}
        )

        if(!userData){
            return res.send("invalid userName/email or password")
        }
    
        if(!(userData.email == email && bcrypt.compare(password, userData.password))){
            return res.send("invalid userName/email or password")
        }
        
    
    
        // 3.
        const token = createToken({ email });
        console.log(`User login \n ${token}`);
        return res.send({ message: "User logged in successfully!", token: token });
    
    
    } catch (error) {
        console.log(`Error in loginUser! \n ${error}`)
        res.send(`Error in loginUser! \n ${error}`)
    }


}






const allUsers = async(req, res)=>{
    try {
        const { sort, date } = req.query;
        const sortOrder = sort === 'asc' ? 1 : -1;

        let query = {};

        if (date) {
            const startDate = DateTime.fromFormat(date, 'yyyy-MM-dd').startOf('day').toJSDate();
            const endDate = DateTime.fromFormat(date, 'yyyy-MM-dd').endOf('day').toJSDate();
            query.time_of_registration = { $gte: startDate, $lte: endDate };
        }

        const users = await User.find(query).sort({ time_of_registration: sortOrder });
        console.log("Users shows successfully!");
        res.send(users);
    } catch (error) {
        console.log(`Error in showing upUserss! \n ${error}`);
        res.send(`Error in showing upUserss!`)
    }
}





const updateUser = async(req, res)=>{
    try {
        const {email, name, mobile, coordinates, password} = req.body;
        const {longitude, latitude} = coordinates || {};
        const upUser = await User.updateOne({email}, { $set: {name: name, mobile: mobile, latitude: latitude, longitude: longitude, password: password }})
        console.log(`User update successfully! \n ${upUser}`);
        res.send(`User update successfully!`);
    } catch (error) {
        console.log(`Error in update user. \n ${error}`);
        res.send(`Error in update user.`)
    }
}



const deleteUser = async(req, res)=>{
    try {
        const {email} = req.body;
        const delUser = await User.deleteOne({email});
        console.log("User Delete successfully!");
        res.send(`User Delete Successfully! ${delUser}`);
    } catch (error) {
        console.log("User not Delete !");
        res.send(`Error in deleteUser \n ${error}`);
    }
}









export {createUser, loginUser, allUsers, updateUser, deleteUser}