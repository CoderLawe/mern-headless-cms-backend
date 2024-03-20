// webhook.js

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const House = require("../../models/house");

router.post('/stripe-webhook', async (req, res) => {
  const event = req.body;
  console.log("Webhook Event:", event);

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const houseId = session.client_reference_id;
    const customerId = session.customer;
    const customerEmail = session.customer_email;
    const amountPaid = session.amount_total;
    const startDate = session.metadata.startDate;
    const endDate = session.metadata.endDate;
    const nights = session.metadata.nights;

    // Find house in MongoDB by ID
    const house = await House.findById(houseId);

    if (house) {
      // Add order details to the orders array
      house.orders.push({
        customerId,
        customerEmail,
        amountPaid,
        startDate,
        endDate,
        nights
      });

      // Save changes to the house document
      await house.save();
      console.log('House updated with order details:', house);
    } else {
      console.log('House not found:', houseId);
    }
  }

  // Respond to Stripe with success status
  res.sendStatus(200);
});

module.exports = router;
