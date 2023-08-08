import mongoose from "mongoose";
import JWT from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    pp: {
        type: String,

    },
    password: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

const User = mongoose.model('User', userSchema);

export default User;
