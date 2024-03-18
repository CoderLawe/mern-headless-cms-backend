const express = require("express");
const router = express.Router();
const House = require("../../models/house");

// const multer = require("multer");

// let upload = multer({ storage, fileFilter });
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

// Env variable.

router.post('/create-checkout-session', async (req, res) => {
    const { amount, description, success_url, cancel_url, imageUrl, houseId, startDate, endDate, nights } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description,
              images: [imageUrl], 
              metadata: {
                startDate,
                endDate,
                nights
              }

            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url:"http://localhost:3000/allhouses",
      cancel_url,
      client_reference_id: houseId, // Pass the houseId here

    });
    const house = await House.findOneAndUpdate(
      { orderId }, // Update query
      { $push: { orders: { customerId, customerEmail, amountPaid, startDate, endDate, nights } } }, // Add the order details to the orders array
      { new: true } // Return the updated document
    );

    // Log the updated house document
    console.log('Updated House:', house);
    
    // Respond with success status
    res.sendStatus(200);
    res.json({ url: session.url });
    console.log("session", session)
  });

module.exports = router