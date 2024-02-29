// webhook.js

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const House = require("../../models/house");

router.use(bodyParser.raw({ type: 'application/json' }));

router.post('/stripe-webhook', async (req, res) => {
  const event = req.body;

  // Handle the event based on its type
  switch (event.type) {
    case 'checkout.session.completed':
      // Extract relevant data from the event object
      const session = event.data.object;
      const customerId = session.customer; // Customer ID
      const customerEmail = session.customer_email; // Customer Email
      const orderId = session.client_reference_id; // Order ID
      const amountPaid = session.amount_total; // Amount Paid
      const startDate = session.metadata.startDate;
      const endDate = session.metadata.endDate;
      const nights = session.metadata.nights
    //   const itemName = session.display_items[0].custom.name; // Item Name
    //   const itemPrice = session.display_items[0].amount / 100; // Item Price (in dollars)

      // Example: Log the retrieved customer and order details
      console.log('Checkout session completed:');
      console.log('Customer ID:', customerId);
      console.log('Customer Email:', customerEmail);
      console.log('Order ID:', orderId);
      console.log('Amount Paid:', amountPaid);
      console.log("startDate", startDate);
      console.log("endDate", endDate)
      console.log("nights", nights);

    //   console.log('Item Name:', itemName);
    //   console.log('Item Price:', itemPrice);

      // Now you can process this information as needed, such as updating your database
          // Find the house in the database based on the orderId or any other identifier
          const house = await House.findOneAndUpdate(
            { orderId }, // Update query
            { $push: { orders: { customerId, customerEmail, amountPaid, startDate, endDate, nights } } }, // Add the order details to the orders array
            { new: true } // Return the updated document
          );
  
          // Log the updated house document
          console.log('Updated House:', house);
          
          // Respond with success status
          res.sendStatus(200);

      break;
    case 'payment_intent.succeeded':
      // Handle successful payment intent
      // Extract relevant data from the event object and process it
      console.log('Payment intent succeeded:', event);
      break;
    // Handle other types of events as needed
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.sendStatus(200);
});

module.exports = router;
