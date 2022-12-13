import mongoose from "mongoose";
import { nanoid } from "nanoid";

const userModel = mongoose.Schema({
    
    _id:{
        type: String,
        default : ()=>nanoid()
    },
    firstName:{
        type : String,
        required: false
    },
    lastName:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userName: {
        type : String,
        required: true,
        unique: true 
    },
    editPassword:{
        type: Boolean,
        default: false
    },

})

let user = mongoose.model('User',userModel)
export default user