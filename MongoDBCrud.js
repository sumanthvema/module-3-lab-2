const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});


const url = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`; // MongoDB server URL
const dbName = process.env.DATABASE;
const collectionName = 'loanDetails';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

//2. Create (Insert) Operation

async function insertLoanData(loanData) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(loanData)
        console.log(`New document inserted with _id: ${result.insertedId}`);
    } finally {
        await client.close();
}
}
//3. Read (Find) Operation

async function findLoanData(query) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const loanData = await collection.findOne(query);
        console.log(`Customer Found:${JSON.stringify(loanData)}`);
        return loanData;
    } finally {
        await client.close();
    }   
}
//4. Update Operation
async function updateLoanData(query, update) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.updateOne(query, { $set: update });
        console.log(`${result.matchedCount} document(s) matched the query,${result.modifiedCount} document(s) was/were updated.`);
        return result;
    } finally {
        await client.close();
    }
}
//5. Delete Operation

async function deleteLoanData(query) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne(query);
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
        return result;
    } finally {
        await client.close();
    }
}

module.exports ={
     insertLoanData: insertLoanData,
     findLoanData: findLoanData, 
     updateLoanData:updateLoanData, 
     deleteLoanData: deleteLoanData
}