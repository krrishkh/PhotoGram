import mongoose, {Schema} from "mongoose";

const postSchema = new mongoose.Schema(
    {
        image:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true,
            trim: true
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        likes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }]
    },
    {
        timestamps:true
    }
)

export const Post = mongoose.model("Post", postSchema);