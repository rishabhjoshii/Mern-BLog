const mongoose =require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        min : 4,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        min: 6
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;