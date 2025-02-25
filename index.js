require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require('fs');

const app = express();

// Ensure "uploads" folder exists
// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }


// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Add this if using form data

// Configure CORS to allow multiple origins
app.use(cors());


// Import routes
const userRouter = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const productRoutes = require('./Routes/productRoutes'); // ✅ Added product routes
const helpRoutes = require("./Routes/helpRoutes");
// const contactRoutes = require("./Routes/contactRoutes");
const adminRoutes = require("./Routes/adminRoutes");

const hinduProductRoutes = require('./Routes/hinduProductRoutes');
const christianProductRoutes = require("./Routes/christianProductRoutes");
const muslimProductRoutes = require("./Routes/muslimProductRoutes");
// const orderRoutes = require('./Routes/orderRoutes');
const addressRoutes = require('./Routes/addressRoutes');


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Use Routes
app.use("/user", userRouter);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes); // ✅ Added product routes
app.use("/admin", adminRoutes);
// app.use("/adminhindu", hinduRoutes);
app.use("/christianProducts", christianProductRoutes);
// app.use("/order",order);



// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.use("/help", helpRoutes);

app.use('/hinduProducts', hinduProductRoutes);
app.use('/muslimProducts', muslimProductRoutes);

// app.use('/order', orderRoutes);

app.use('/address', addressRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
