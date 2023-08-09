import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import upload from "../../middleware/upload.js";
import { allUserController, deleteUserByIdController, getUserByIdController, uploadImageController, userLoginController, userRegisterController, userUpdateController } from "../../controllers/userController.js";

const router = express.Router()

//ADD USER WITH IMAGE || POST
router.post('/add-user', upload.single('pp'), uploadImageController)

//USER REGISTER || POST
router.post('/user-register', userRegisterController)

//USER LOGIN || POST
router.post('/user-login', userLoginController)

//USER UPDATE || POST
router.post('/update-user', authMiddleware, userUpdateController)

//ALL USER || GET
router.get('/all-user', allUserController)

//SINGLE USER || GET
router.get('/get-user/:id', getUserByIdController)

//DELETE USER || POST
router.post('/delete-user/:id', deleteUserByIdController)







export default router;
