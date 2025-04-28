import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Role = {
    ADMIN: 'ADMIN',
    USER: 'USER'
};

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        default: null,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    stats: {

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
        required: true,
    },
    bio: {
        type: String,
        maxlength: 500,
        default: 'Hello this is my Bio',
        required: false,
    },
    image: {
        type: String,
        required: false,
        default: null,
    },
    address: {
        type: Array,
        required: false,
        default: []
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);