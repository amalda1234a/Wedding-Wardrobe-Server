const mongoose = require('mongoose');
const Product = require('../models/productModel')
// const Cart = require('../models/cartModel');

async function addProduct(req, res) {
    try {
      console.log(req.file);
      const filePath = req.file.path.replace(/\\/g, '/');
      const product = { name, price, category,image,description } = req.body
      const products = new Product({ name: product.name, price: product.price, category: product.category , description: product.description, image: `${req.protocol}://${req.get('host')}/${filePath}`});
      const productData=await products.save();
      const product1 = await Product.find()
      res.status(200).json({message: 'Product saved successfully',data: productData});
    } catch (error) {
      res.status(500).json({ message:'server error',error: error.message})
    }
  }
// Controller to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// cart




// const addToCart = async (req, res) => {
//     try {
//         const { userId, cartItems } = req.body;

    
//         if (!userId || !cartItems || cartItems.length === 0) {
//             return res.status(400).json({ message: "Missing required fields: userId or cartItems" });
//         }

       
//         for (let item of cartItems) {
//             if (!item.productId || !item.quantity) {
//                 return res.status(400).json({ message: "Each cart item must have productId and quantity" });
//             }
//         }

        
//         const cart = new Cart({ userId, cartItems });
//         await cart.save();

//         res.status(201).json({ message: "Cart updated successfully", cart });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding to cart", error: error.message });
//     }
// };

// carttt


// Get Cart function
// const getCart = async (req, res) => {
//     try {
//         const { userId } = req.query;  

//         if (!userId) {
//             return res.status(400).json({ message: "UserId is required" });
//         }

        // Ensure userId is converted to ObjectId
//         const cart = await Cart.findOne({ userId: mongoose.Types.ObjectId(userId) })
//             .populate('cartItems.productId');

//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }

//         res.status(200).json({ message: 'Cart fetched successfully', cart });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching cart', error: error.message });
//     }
// };


// cart

// async function removeFromCart(req, res) {
//     try {
//         const { userId, productId } = req.body;

//         // Find the cart
        // const cart = await Cart.findOne({ userId });
        // if (!cart) {
        //     return res.status(404).json({ message: "Cart not found" });
        // }

        // Filter out the product to be removed
        // cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // Save the updated cart
//         const updatedCart = await cart.save();
//         res.status(200).json({ message: "Product removed from cart", data: updatedCart });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }
// cart

// async function clearCart(req, res) {
//     try {
//         const { userId } = req.params;

        // Find the cart
        // const cart = await Cart.findOne({ userId });
        // if (!cart) {
        //     return res.status(404).json({ message: "Cart not found" });
        // }

//         Clear all items
//         cart.items = [];
//         const updatedCart = await cart.save();
//         res.status(200).json({ message: "Cart cleared successfully", data: updatedCart });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }


module.exports = {
    addProduct,
    getAllProducts,
    // addToCart,
    // getCart,
    // removeFromCart,
    // clearCart
}

// item inc ,dec ,delete