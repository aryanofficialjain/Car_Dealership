const paypal = require("paypal-rest-sdk");

paypal.configure({
  "mode": 'sandbox',
  "client_id": process.env.PAYPAL_CLIENT_ID,
  "client_secret": process.env.PAYPAL_CLIENT_SECRET,
});

const payment = async (req, res) => {
  try {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: `http://localhost:8000/paypal/success`,
        cancel_url: `http://localhost:8000/paypal/failed`
      },
      transactions: [{
        amount: {
          total: "1.00",
          currency: "USD"
        },
        description: "This is the payment description."
      }]
    };

    const paymentData = await new Promise((resolve, reject) => {
      paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
          console.error('PayPal payment creation error:', error.response);
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });

    console.log(paymentData);
    res.json(paymentData);
  } catch (error) {
    console.error("Error while making a payment from payment route", error);
    res.status(500).send("Error processing payment");
  }
};


const success = async(req,res) => {
    console.log(req.query);

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const express_checkout_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00",

            },
            "description": "This is the payment description "
        }]
    }

    paypal.payment.execute(paymentId, express_checkout_json, function(error, payment){
        if(error){
            console.log(error);
            return res.redirect("http://localhost:8000/paypal/failed")
        } else {
            const response = JSON.stringify(payment);
            const ParshedResponse = JSON.parse(response);

            console.log(ParshedResponse);

            return res.redirect("http://localhost:8000/paypal/success");
        }
    })
}


const failed = async(req,res) =>{
  console.log(req.body);
}



module.exports = { payment, success, failed};