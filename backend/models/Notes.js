import mongoose from "mongoose";
import { Schema } from "mongoose";

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    tag:{
        type:String,
        default:"General "
    },
    date:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model('Notes',NotesSchema);