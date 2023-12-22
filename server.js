const mongoose = require("mongoose");
const app = require("../1-Team-CRM-Back");
require("dotenv").config();

// environment variables
const PORT = process.env.PORT;
const CLUSTER = process.env.CLUSTER;

async function connectionToDatabase() {
  try {
    await mongoose.connect(CLUSTER);
    console.log("connected to db");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectionToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
