// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 💳 Route to initiate Paystack payment
app.post("/api/payment/initiate", async (req, res) => {
  const { amount, email, provider } = req.body;

  if (!amount || !email || !provider) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (provider !== "paystack") {
    return res.status(400).json({ error: "Unsupported payment provider." });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: amount * 100, // in kobo for USD
        email,
        currency: "USD",
        callback_url: "http://localhost:3000/payment-success", // update to live URL later
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentUrl = response.data.data.authorization_url;
    res.json({ payment_url: paymentUrl });

  } catch (err) {
    console.error("Paystack Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Paystack payment failed." });
  }
});

// 🔄 Start the backend server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});