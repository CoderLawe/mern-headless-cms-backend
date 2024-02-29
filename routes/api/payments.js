const express = require("express");
const router = express.Router();
// const multer = require("multer");

// let upload = multer({ storage, fileFilter });


router.post('/create-checkout-session', async (req, res) => {
    const { amount, description, success_url, cancel_url, imageUrl } = req.body;
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
      success_url:"http://localhost:3000/allhouses",
      cancel_url,
    });
    res.json({ url: session.url });
  });

module.exports = router