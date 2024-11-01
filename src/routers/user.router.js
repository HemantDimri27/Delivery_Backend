import { Router } from "express";
import { allUsers, createUser, deleteUser, loginUser, updateUser } from "../controlers/user.controler.js";
import { allInventory, createInventory, deleteInventory, updateInventory } from "../controlers/inventory.controler.js";

import authJWT from "../middlewares/authJWT.middleware.js";



const router = Router()

router.route('/allUsers').get(authJWT, allUsers)
router.route('/createUser').post(createUser)
router.route('/loginUser').post(loginUser)
router.route('/updateUser').put(authJWT, updateUser)
router.route('/deleteUser').delete(authJWT, deleteUser)


router.route('/allInventory').get(authJWT, allInventory)
router.route('/createInventory').post(authJWT, createInventory)
router.route('/updateInventory').put(authJWT, updateInventory)
router.route('/deleteInventory').delete(authJWT, deleteInventory)




export default router