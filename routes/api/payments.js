const express = require("express");
const router = express.Router();
// const multer = require("multer");

// let upload = multer({ storage, fileFilter });

router.post("/payment", async (req, res)   => {
    const {amount, id}  = req.body;
    try {
        const payment = await stripe.paymentIntents.create({amount, currency:"USD", description:"Spatula", payment_method:id, confirm:true,return_url:"http://localhost:3000"})
        console.log("Payment", payment)
        res.json({
            message:"Payment Succesful",
            success:true
        })
    } catch (error) {
            console.log("error", error)
            res.json({
                message:"Payment Failed",
                success:false
            })
    }
})

