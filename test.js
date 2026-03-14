const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://mongo:mongo@cluster0.r9oqtam.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB");
  } catch (error) {
    console.error("❌ Connection failed:");
    console.error(error);
  } finally {
    await client.close();
  }
}

testConnection();
