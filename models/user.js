import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema({
    googleID: {
        type: String,
        required: false,
        default: null
    },
    githubID: {
        type: String,
        required: false,
        default: null
    },
    facebookID: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: false,
        unique: true,
        default: null
    },
    emailToken: String,
    isVerified: {
        type: Boolean,
        default: false,
        index: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    nama: {
        type: String,
        required: true,
        unique: false
    },
    avatar: {
        path: { type: String, default: '/img/profile/default-icon.png' },
        filename: String
    },
    background: {
        type: String,
        required: false,
        default: '/img/profile/default-background.png',
    },
    bio: {
        type: String,
        required: false,
        default: null
    },
    website: {
        type: String,
        required: false,
        default: null
    },
    instagram: {
        type: String,
        required: false,
        default: null
    },
    github: {
        type: String,
        required: false,
        default: null
    },
    twitter: {
        type: String,
        required: false,
        default: null
    },
    isPassword: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

userSchema.index({ createdAt: 1 }, {
    expireAfterSeconds: 1 * 24 * 60 * 60,
    partialFilterExpression: {
        isVerified: false
    }
});

let Dataset = mongoose.models.users || mongoose.model('users', userSchema)
export default Dataset;