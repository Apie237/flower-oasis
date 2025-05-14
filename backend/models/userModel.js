import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String},
    cartData: {type: Array, default: []},  // Changed from Object to Array
}, {minimize: false});

// Prevent duplicate model compilation error
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;