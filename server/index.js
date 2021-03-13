const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
const createExpressApp = require("./create-express-app");

dotenv.config();

const client = new MongoClient(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect().then(db=>{
    createExpressApp(client.db("angular-auth"))
        .listen(3000, ()=>{
            console.log("Listening on port 3000 ...");
        })
});