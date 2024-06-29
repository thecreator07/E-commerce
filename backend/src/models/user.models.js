import Mongoose, { Schema} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { Constant, Types } from '../utils';

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            maxLength: [30, 'Maxlength 30 Characters'],
            minLength: [4, 'MinLength 4 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please enter email'],
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid email'],
        },
        phone: {
            type: String,
            validate: {
                validator: (value) => !value || validator.isMobilePhone(value, 'en-IN'),
                message: 'Please enter a valid phone number',
            },
            default: null,
        },
        dob: {
            type: Date,
            default: null,
        },
        gender: {
            type: String,
            validate: {
                validator: (value) => !value || ['male', 'female', 'other'].includes(value),
                message: 'Please enter a valid gender',
            },
            default: null,
        },

        address: {
            type: String,
            // required: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            unique: true,
        },
        avatar: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            default: 'user',
        },
        active: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

//Pre middleware hook are executed one after another, when each middleware calls next.
//before saving the user data we hash password using bcrypt for security purpose
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
});

//this method will compare given password with stored password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); //compare return true/false
};

//this method will return token which can be used to authenticate user
userSchema.methods.generateAccesToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,

        },
        // {algorithm:'HS256'}
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = Mongoose.model("User", userSchema);


