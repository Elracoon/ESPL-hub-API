import { MongoClient } from "mongodb";

export class Db {
    static async get() {
        if (Db.mongoClient !== undefined) {
            return Db.mongoClient.db();
        }
        Db.mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
        console.info("init mongoDb houseinfo connexion");
        return Db.mongoClient.db();
    }
    static async close() {
        console.info("close mongoDb houseinfo connexion");
        try {
            await Db.mongoClient.close();
        } catch (error) {
            console.error(error);
        }
    }
}





