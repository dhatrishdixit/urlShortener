import mongoose from "mongoose";
import { nanoid } from "nanoid";

const urlSchema = mongoose.Schema({
    longUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        //default:()=>nanoid(5)
    },
    count:{
        type:Number,
        default:0
    }
},{
    collection:'urls'
})

const Url = mongoose.model('Url',urlSchema);

export default Url ;