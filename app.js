// Student Name - Naga Sumanth Vema
// Student Id - 1227779282
// Dude Date - 02/18/2024

const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const loanRouter = require('./routes/routes')
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//connecting to the database
const mongoose = require('mongoose');

//asynchronous DB connection with parameterized DB connection string
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`
,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(`MongoDB connection succeeded with ${process.env.DATABASE}...`))
.catch((err) => console.log('Error in DB connection: ' + err));

app.use(bodyParser.json());

app.use('/api/loans', loanRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));