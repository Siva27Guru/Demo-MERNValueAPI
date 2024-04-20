// server.js
//Use express , mongodb and req body parser 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Connection by mongoose using connect and connection with open using once opened establish the connection
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

//Schema to set in response value (variable and type similar to struct in golang)
const TestSchema = new mongoose.Schema({
  value: String,
});

//collection name and schema doc defined above
const TestModel = mongoose.model('Test', TestSchema);

//API 1 - save a value using express -> taking the value from requests (async) --> test collection creates a value doc in it

app.post('/api/save', async (req, res) => {
  const { value } = req.body;
  try {
    const savedValue = await TestModel.create({ value });
    res.json({ message: `Value "${savedValue.value}" saved successfully!` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save value.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
