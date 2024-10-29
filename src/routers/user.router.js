import { Router } from "express";
import { allUsers, createUser, deleteUser, loginUser, updateUser } from "../controlers/user.controler.js";
import { allInventory, createInventory, deleteInventory, updateInventory } from "../controlers/inventory.controler.js";



const router = Router()

router.route('/allUsers').get(allUsers)
router.route('/createUser').post(createUser)
router.route('/loginUser').post(loginUser)
router.route('/updateUser').put(updateUser)
router.route('/deleteUser').delete(deleteUser)


router.route('/allInventory').get(allInventory)
router.route('/createInventory').post(createInventory)
router.route('/updateInventory').put(updateInventory)
router.route('/deleteInventory').delete(deleteInventory)




export default router