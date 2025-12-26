import { Product } from "../Models/product.mjs";

//add Product
export const addProduct = async (req, res) => {

    try {
        let product = await Product.create(req.body);
        res.json({ message: "Product added successfully", product, success: true })
    } catch (error) {
        res.json(error.message)
    }
};


//Get All Product

export const getAllProduct = async (req, res) => {

    try {
        let products = await Product.find();
        if (!products) return res.json({ message: "No products Found", success: false })

        res.json({ message: "Fetched Products are", products, success: true })
    } catch (error) {
        res.json(error.message)
    }
};


//Get Product by ID
export const getProductById = async (req,res) =>{
    const id = req.params.id
    try {
        let product = await Product.findById(id);
        if (!product) return res.json({ message: "Invalid ID", success: false })

        res.json({ message: "Fetched specifice Product are", product, success: true })
    } catch (error) {
        res.json(error.message)
    }
};

//Get Product by ID And Delete
export const getProductByIdAndDel = async (req,res) =>{
    const id = req.params.id
    try {
        let product = await Product.findByIdAndDelete(id);
        if (!product) return res.json({ message: "Invalid ID", success: false })

        res.json({ message: "Product deleted successfully....", success: true })
    } catch (error) {
        res.json(error.message)
    }
};


//Get Product by ID And Update
export const getProductByIdAndUpdate = async (req,res) =>{
    const id = req.params.id
    try {
        let product = await Product.findByIdAndUpdate(id,req.body,{new:true});
        if (!product) return res.json({ message: "Invalid ID", success: false })

        res.json({ message: "Product Updated successfully....", product, success: true })
    } catch (error) {
        res.json(error.message)
    }
};