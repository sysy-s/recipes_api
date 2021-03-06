const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const path = require('path');
const recipeRouter = require(path.join(__dirname, './routes/recipes'));

const cors = require('cors');
const corsOpts = {
     origin: 'https://palcelizac.herokuapp.com',
}

const dotenv = require('dotenv');
dotenv.config();
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.9s0vp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || port))
  .catch((err) => console.log(err));

app.use('/images', express.static('images'));
app.use(cors(corsOpts));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.use('/recipes', recipeRouter);