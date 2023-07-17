import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getAuth = async (request, response, next)=>{
    try {
        const token = request.headers.token;
        if(!token){
            response.status(401).json({error: "Unauthorized"})
        }
        const verifyToken = jwt.verify(token, process.env.SECRET)
        //console.log(verifyToken)
        const auth = await User.findById(verifyToken.id)
        request.userId = verifyToken.id
        request.auth = auth
        next()
    } catch (error) {
        response.status(401).json({error: "Unauthorized"})
    }
};

export default getAuth;
