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
        default:null,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default:null,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [Role.ADMIN, Role.USER],
        default: Role.USER,
        required: true,
    },
    bio: {
        type: String,
        maxlength: 500,
        default: 'Hello this is my Bio',
        required: false,
    },
    profilePicture: { 
        type: String,
        required: false,
        // default: "https://scontent.fuln5-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=NtrlBO4xUsUQ7kNvgFdjLFA&_nc_oc=AdiuAp9iFcDCUxFgAryoC1FLxSCqczY2UFGugbyxaV161QCTCypoeaL_DBaIJ3i1ORU&_nc_zt=24&_nc_ht=scontent.fuln5-1.fna&_nc_gid=AmPl3CIj3-EG2Uu4kzZNCiD&oh=00_AYGLSh6INtNlz2JRUlDhICoSosuGokk6JKKm4-6bVVJ1Ow&oe=67F716BA"
        default: null,
    },
    address:{
        type: Array,
        required: false,
        default: []
    },
    orders:{
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