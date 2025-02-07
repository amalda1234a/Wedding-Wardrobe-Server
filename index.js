require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();

// Configure CORS to allow multiple origins
app.use(cors());

// Middleware
app.use(express.json());

// Import routes
const userRouter = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/cartRoutes');
// const contactRoutes = require("./Routes/contactRoutes");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Use Routes
app.use("/user", userRouter); // Ensure correct API path
app.use("/cart", cartRoutes);

// app.use("/contact", contactRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
