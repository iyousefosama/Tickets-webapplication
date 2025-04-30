import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; // The mongoDb connection string

// Connect function that will be executed each time in the requests
const connect = async () => {
    /**
     * Checks the mongodb readyState
     * 0 = disconnected
     * 1 = connected
     * 2 = connecting
     */
    const mongoConnection = mongoose.connection.readyState;

    // Don't do anything on connected state
    if (mongoConnection === 1) {
        // * MongoDb is already connected.
        return;
    }

    // Logs "connecting" and do nothing on connecting state
    if (mongoConnection === 2) {
        console.log("🔄 [MONGO]: Connecting...");
        return;
    }

    // If state not connected or connecting tries to connect
    try {
        await mongoose.connect(MONGO_URI!);
        console.log("✅ [MONGO]: Connected!");
    } catch (error) {
        throw new Error("❌ [MONGO]: Failed to connect to MongoDB\n" + error);
    }
};

export default connect;