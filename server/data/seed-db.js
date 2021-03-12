require('dotenv').config();

const users = require("./users");
const contacts = require("./contacts");

const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");

const client = new MongoClient(process.env.DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true });

async function seedCollection(collectionName, initialRecords) {
    const collection = client.db("angular-auth").collection(collectionName);
    await collection.deleteMany();
    initialRecords.forEach(item => {
        if(item.password){
            item.password = bcrypt.hashSync(item.password, 10);
        }
    });
    await collection.insertMany(initialRecords);
}

client.connect(async err=>{
    await seedCollection('users', users);
    await seedCollection('contacts', contacts);
    client.close();
});
