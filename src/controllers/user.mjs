import { User } from "../Models/user.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })
    if (user) return res.json({ message: "User already exists", success: false })

    let hashPassword = await bcrypt.hash(password, 10)

    user = await User.create({
        name,
        email,
        password: hashPassword
    });
    res.json({ message: "User registered successfully....", user, success: true })

}


export const login = async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({ email })

    if (!user) return res.json({ message: "No user found....", success: false })

    const ValidPass = await bcrypt.compare(password, user.password)

    if (!ValidPass) return res.json({ message: "Password does not match..", success: false })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:"3d"
    })

    res.json({ message: `Welcome back ${user.name}`,token,success:true })
}