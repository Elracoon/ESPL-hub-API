import { MongoClient } from 'mongodb';

class Db {
	constructor() {
		this.url = "mongodb+srv://leane:43frBcSIZTP76FhQ@espl-hub.ybdgitg.mongodb.net/?retryWrites=true&w=majority";
		this.dbName = "espl-hub";
		this.client = null;
	}

    async connect() {
		if (!this.client) {
			this.client = new MongoClient(this.url);

			await this.client.connect();
			console.log('Database connected');
		}

        return this.client.db(this.dbName);
    }

    async close() {
        if (this.client) {
            await this.client.close();
            console.log('Database close');
        }
    }
}

const database = new Db();
export default database;





