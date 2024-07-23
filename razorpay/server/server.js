const app = require("./index.js");
// const Razorpay = requier("razorpay");
const PORT = 8000;

// export const instance = new Razorpay({c
//     key_id: "process.env.KEY_ID",
//     key_secret: "process.env.KEY_SECRET",
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });