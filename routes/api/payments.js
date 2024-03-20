const express = require("express");
const router = express.Router();
// const multer = require("multer");

// let upload = multer({ storage, fileFilter });
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

// Env variable.
router.post('/create-checkout-session', async (req, res) => {
  // Extract necessary details from the request body
  const { amount, description, success_url, cancel_url, imageUrl, houseId, startDate, endDate, nights } = req.body;

  // Create a Checkout Session with Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: description,
            images: [imageUrl], 
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url, // Success URL
    cancel_url, // Cancel URL
    client_reference_id: houseId, // Pass the houseId here
    metadata: {
      startDate,
      endDate,
      nights
    }
  });

  // Respond with the session URL
  res.json({ url: session.url });
});

module.exports = router;

module.exports = router