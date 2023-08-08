import userModel from "../models/userModel.js"



// ================== ADD EMPLOYE WITH PROFILE IMAGE (assuming admin end-point) =======================//

export const uploadImageController = async (req, res) => {
    try {

        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        });
        if (req.file) {
            user.pp = req.file.path
        }
        await user.save();
        res.status(201).json({ message: "user added successfully", user });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}


// ================== CREATE USER  (assuming user-end-point) =======================//

export const userRegisterController = async (req, res) => {
    const { name, email, password, mobile, profilePicture } = req.body;

    try {
        if (!name || !email, !password, !mobile) {
            return res.status(401).json({ message: " please  provide all required field's" })
        }

        const exsistingUser = await userModel.findOne({ email })
        if (exsistingUser) {
            return res.status(401).json({ success: false, message: "user already register" })
        }
        const user = await userModel.create({ name, email, password, mobile, profilePicture })

        res.status(201).json({
            success: true,
            message: " user register successfully",
            user,

        })
    } catch (error) {
        res.status(401).json({ success: false, message: "user registeration failed" })
    }
}




// ================== LOGIN USER   (assuming user-end-point) =======================//


export const userLoginController = async (req, res) => {

    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ message: "please provide all field" })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "please SignUp first" })
        }
        if (user.password !== password) {

            return res.status(401).json({ message: "Invalid mail and password" })
        }
        const token = await user.createJWT()
        res.status(200).json({ message: "user login successfully", user, token })
    } catch (error) {
        res.status(401).json({ success: false, message: "user login failed" })
    }
}




// ================== GET ALL USER (assuming admin-end-point) =======================//


export const allUserController = async (req, res) => {
    try {
        const allUser = await userModel.find()
        if (!allUser) {
            return res.status(401).json({ success: false, message: "something went wrong or empty user" })
        }
        if (allUser) {
            res.status(200).json({
                success: true,
                message: " user register successfully",
                allUser
            })
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "something went wrong" })
    }
}



// ================== USER UPDATE   (assuming user - end - point) =======================//

export const userUpdateController = async (req, res) => {
    const { name, email, mobile } = req.body;
    const userId = req.user.userId;
    try {
        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            return res.status(401).json({ message: "invalid user" })
        }
        user.name = name
        user.email = email;
        user.mobile = mobile;

        await user.save();
        res.status(200).json({
            success: true,
            message: `update successfully`,
            user
        });
    } catch (error) {
        res.status(400).json({ message: "internal error" });
    }
};



// ==================  GET USER BY ID   (assuming user - end - point) =======================//

export const getUserByIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(404).json({ message: "something went wrong" });
    }
};



// ==================  DELETE USER  (assuming user - end - point) =======================//

export const deleteUserByIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await userModel.findOneAndDelete({ _id: id });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "an error occurred while deleting the user'" });
    }
};






