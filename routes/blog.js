import Blog from "..//models/BlogSchema.js";
import express from "express";
import getAuth from "../middleware/auth.js";

//create blog router to make the routes
const BlogRouter = express.Router()
BlogRouter.use(express.json());

const responsee = (response, status, result)=>{
    response.status(status).json(result);
}

//create routes: get, post
BlogRouter.get("/", getAuth, async (request, response)=>{
    await Blog.find().populate("user", "-password").sort("-createdOn")
    .then(result=>{
        responsee(response, 200, result)
    })
    .catch(err=>{
        responsee(response, 400, {error: err})
    })
});

BlogRouter.post("/create", getAuth, async (request, response)=>{
    try {
        const {title, content, image} = request.body
    if(title && content){
        const blog = new Blog({
            title, content, image, user: request.userId
        })
        await blog.save()
        responsee(response, 200, {msg: "Blog Created", blog: blog })
    }
    } catch (error) {
        responsee(response, 400, {error: error})
    }
});

BlogRouter.delete("/delete/:id", getAuth, async (request, response)=>{
    try {
        const blog = await Blog.findOneAndDelete({user: request.userId, _id: request.params.id})
        if(!blog){
            responsee(response, 404, {error: "Blog Not Found"})
        }
        responsee(response, 200, {msg: "Blog Deleted!"})
    } catch (error) {
        responsee(response, 400, { error: error })
    }
});

BlogRouter.put("/update/:id", getAuth, async (request, response)=>{
    const {title, content, image} = request.body;
    await Blog.findOneAndUpdate({user: request.userId, _id: req.params.id},{
        title, content, image
    })
    .then((result)=>responsee(response, 200, {msg: "Blog Updated", blog: result}))
    .catch(err=>responsee(response, 400, err))
});

BlogRouter.get("/:id", getAuth, async (request, response)=>{
    await Blog.findById(req.params.id).populate("user", "-password")
    .then(result=>responsee(response, 400, {error: err}))
})

export default BlogRouter;