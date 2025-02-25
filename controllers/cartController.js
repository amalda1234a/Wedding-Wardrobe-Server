const Cart = require("../models/cartModel");

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "User ID and Product ID are required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (existingProductIndex > -1) {
      cart.products[existingProductIndex].quantity += quantity || 1;
    } else {
      cart.products.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get cart items for a user
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", cart: [] });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter((item) => !item.productId.equals(productId));

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Increment product quantity in cart
exports.incrementQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find((item) => item.productId.equals(productId));

    if (product) {
      product.quantity += 1;
      await cart.save();
      res.status(200).json({ message: "Product quantity increased", cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Decrement product quantity in cart
exports.decrementQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex((item) => item.productId.equals(productId));

    if (productIndex > -1) {
      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
      } else {
        cart.products.splice(productIndex, 1); // Remove product if quantity becomes 0
      }

      await cart.save();
      res.status(200).json({ message: "Product quantity decreased", cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
