import jwt from "jsonwebtoken";
import { User } from "../Models/user.mjs";

export const isAuthenticated = async (req , res, next) => {
    const token = req.header('Auth')

    if (!token) return res.json({ message: "Please Login first...." })

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    const id = decode.userId;
    let user = await User.findById(id);

    if (!user) return res.json({ message: "No user found...." })


    req.user = user;
    next();
}