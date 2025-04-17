const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load from .env
const PORT = process.env.PORT || 5000;
const Mongo_Url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/onlineBook';

// MongoDB Connection
async function main() {
  try {
    await mongoose.connect(Mongo_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");

    // Start the server only after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

main();

// Default route
app.get('/', (req, res) => {
  res.send('Online Bookstore Backend Running');
});
