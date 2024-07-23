const {instance} = require("../server.js");
const  checkout = async(req,res) => {
    
    const options = {
        amount: 50000,
        currency: "INR",

    };

    const order = await instance.orders.create(options);
    console.log(order);

    res.status(200).json({
        success: true,
    })
}


module.exports = { checkout }