const express = require("express");
const router = express.Router();
// const multer = require("multer");

// let upload = multer({ storage, fileFilter });
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

// Env variable.

router.post('/create-checkout-session', async (req, res) => {
    const { amount, description, success_url, cancel_url, imageUrl, houseId, startDate, endDate, nights } = req.body;
    console.log(
      "Request body", req.body
    )
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
      metadata: {
        startDate,
        endDate,
        nights
      },
      mode: 'payment',
      success_url:"http://localhost:3000/allhouses",
      cancel_url,
      client_reference_id: houseId, // Pass the houseId here

    });
    res.json({ url: session.url });
  });

module.exports = router