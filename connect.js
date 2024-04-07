const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return mongoose.connect(url); //Here i am returning a promise in an async fn, considering .connect() to be async
} //So the promise returned by connectToMongoDB is the promise returned inside it
//If we wrote return 10 then the value 10 would be wrapped in a promise and then returned

module.exports = { connectToMongoDB };
