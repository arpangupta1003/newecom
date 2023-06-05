const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        unique:false,
        minlength:[3,"Enter a Valid First Name"]
    },
    lastname:{
        type: String,
        required: true,
        unique:false,
        minlength:[3,"Enter a Valid Last Name"]
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:[true, "Email already registered"]
    },
    mobilenumber:{
        type:String,
        required: true,
        unique: true,
        minlength:[10,"Enter a correct 10 digit number"],
        maxlength:[10,"Enter a correct 10 digit number"],
    },
    password:{
        type: String,
        required: true,
        minlength:[8,"Password should be altleast 8 characters long"]
    },
    confirmpassword:{
        type: String,
        required: true,
        minlength:[8,"Password should be altleast 8 characters long"]
    }
});
const user=new mongoose.model("User",userSchema);
module.exports=user;