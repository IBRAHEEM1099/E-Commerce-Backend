import { Cart } from '../Models/Cart.mjs';

//Add to cart
export const addToCart = async (req, res) => {
    const { productId, title, price, qty } = req.body;

    const userId = req.user;

    let cart = await Cart.findOne({userId});

    if (!cart) {
        cart = new Cart({ userId, Items: [] });
    }
    const Itemindex = cart.Items.findIndex(
        (Item) => Item.productId.toString() == productId
    )

    if (Itemindex > -1) {
        cart.Items[Itemindex].qty += qty;
        cart.Items[Itemindex].price += price * qty;
    } else {
        cart.Items.push({ productId, title, price, qty });
    }
    await cart.save();
    res.json({ message: "item added to cart", cart, success: true })

}

//get user cart
export const userCart = async (req,res)=>{
    let userId  = req.user

    const cart = await Cart.findOne({userId});

    if(!cart) return res.json({message:"Cart not found..."});

    res.json({message:"User Cart ",cart})
}

//remove item from cart
export const removeProductFromCart = async (req,res)=>{
    const ProductId = req.params.productId;
    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart) return res.json({message:"Cart not Found...."})

        cart.Items = cart.Items.filter((item)=>item.productId.toString() !== ProductId);

        await cart.save()

        res.json({message:"Item has been removed successfully....."})
}


//Clear Cart 
export const clearCart = async (req,res)=>{
    const userId = req.user;
    let cart = await Cart.findOne({userId});
    if(!cart){
        let cart = new Cart({Items:[]});
    }else{
        cart.Items = []
    }

    await cart.save();

    res.json({message:"User Cart Cleared...."});
}

//decrease items qty
export const decreaseProductQty = async (req, res) => {
    const { productId, qty } = req.body;
    const userId = req.user;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart not found" });

    const itemIndex = cart.Items.findIndex(
        item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
        return res.json({ message: "Invalid product ID" });
    }

    const item = cart.Items[itemIndex];
    const pricePerUnit = item.price / item.qty;

    if (item.qty > qty) {
        item.qty -= qty;
        item.price -= pricePerUnit * qty;
    } else {
        cart.Items.splice(itemIndex, 1);
    }

    await cart.save();
    res.json({ success: true, message: "Quantity decreased", cart });
};
