const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'MongoDB';
const dboper = require('./operations');

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {//Implementing with 'then()' instead of 
            // 'dboper.insertDocument(db, { name: "Vadonut", description: "Test"},"dishes", (result) => {'
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");/*Return instead of  
                                                        dboper.findDocuments(db, "dishes", (docs) => {
                                                        console.log("Found Documents:\n", docs); */
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));