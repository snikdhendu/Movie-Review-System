import mongoose, { connection } from "mongoose"

export async function connect() {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI environment variable is not defined");
        }
        mongoose.connect(mongoUri);
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("mongoDb connected");
        })

        connection.on('error', (err) => {
            console.log("mongodb connection error" + err);
            process.exit()
        })

    } catch (error) {
        console.log('Something went wrong', error);
    }
}