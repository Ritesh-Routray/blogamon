import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://riteshdb69:69gkA3Tj3CJSXzCE@cluster0.pxy2xld.mongodb.net/Blogamon";

let isConnected = false; // Global connection state

export async function connectToDatabase() {
  if (isConnected) {
    console.log("🔄 Reusing existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    console.log("⚙️ Connecting to MongoDB...");
    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });

    isConnected = connection.connections[0].readyState === 1;

    if (isConnected) {
      console.log("✅ Connected to MongoDB");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // Retry connection after 5 seconds
    setTimeout(connectToDatabase, 5000);
  }

  return mongoose.connection;
}

// Monitor connection events
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose disconnected from DB");
});

// Graceful shutdown handling
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 Mongoose connection closed due to app termination");
  process.exit(0);
});
