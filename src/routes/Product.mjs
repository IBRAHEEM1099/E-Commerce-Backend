import express from "express";
import { addProduct, getAllProduct, getProductById, getProductByIdAndDel, getProductByIdAndUpdate } from "../controllers/product.mjs";


const router = express.Router()

//ADD PRODUCT
router.post("/add",addProduct)


//GET ALL PRODUCT
router.get("/all",getAllProduct)

//Get Product by ID
router.get("/:id", getProductById)

//Getproduct By iD and Delete
router.delete("/:id", getProductByIdAndDel)

//Get Product By ID and Update
router.put("/:id",getProductByIdAndUpdate)


export default router;