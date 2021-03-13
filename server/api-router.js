const express = require("express");

function apiRouter(database){
    const router = express.Router();

    router.get('/contacts', (req, res)=>{
        const contactsCollection = database.collection('contacts');
        contactsCollection.find({}).toArray().then(docs=>{
            return res.json(docs);
        });
    })
    
    router.post('/contacts', (req, res)=>{
        const user = req.body;
        const contactsCollection = database.collection('contacts');
        contactsCollection.insertOne(user, (err, result)=>{
            if(err){
                return res.status(500).json({ error: 'Error inserting new contact' });
            }
    
            const newContact = result.ops[0];
            return res.status(201).json(newContact);
        });
    });

    return router;
}

module.exports = apiRouter;