// redisClient.js
require("dotenv").config();
const redis = require("redis");
let redisClient;

(async () => {
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  redisClient.on("error", (err) => console.error("Redis Client Error", err));
  redisClient.on("connect", () => console.log("Redis Client Connected"));

  await redisClient.connect();
})();

module.exports = redisClient; // Export the client instance directly
