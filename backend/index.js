const express = require('express')
const app = express()
const port = 8000
const cors = require("cors");
const bodyParser = require('body-parser');
// const conDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const mongoose = require("mongoose");


const url =
  "mongodb+srv://varunsbhat:SvdM4evR@cluster0.nxr7t8t.mongodb.net/stock-market?retryWrites=true&w=majority";
const connect = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(express.json());

const conDB = async () => {
  try {
    const connectDB = await mongoose.connect(url, connect);
    if (connectDB) {
      console.log("connected to the mongodb database");
    } else {
      console.log((error) => error);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
conDB();
app.use(bodyParser.json());

app.use(cors())

app.use('/', authRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

