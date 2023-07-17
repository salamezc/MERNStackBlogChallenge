import mongoose from "mongoose";

// creating blog schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

//creating blog model
const Blog = mongoose.model("blog", blogSchema);

export default Blog;