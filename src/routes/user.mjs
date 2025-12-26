import express from "express";
import { login, register } from "../controllers/user.mjs";


const router = express.Router()

//register 
//@endpoint /api/user/register
router.post('/register',register)

//login
//@endpoint /api/user/login
router.post('/login',login)


export default router;