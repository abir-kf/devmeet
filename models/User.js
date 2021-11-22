const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{//to get profile picture from gmail
        type: String
    },
    date: { 
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);//we will export a variable called user li ansmiw bih DB li fiha model li drna db o kndkhlo lih 2 argmts (user smia d model and schema li we create it )