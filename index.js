const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  name: { type: String, required: true },
  studentID: { type: String, required: true },
});
// Create a Model object
const Student = mongoose.model("W24student", studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const myuri = req.body.myuri;
  // connect to the database and log the connection
  mongoose.connect(myuri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      const name = "Jack Braun"
      const studentID = "300349282"
      const newStudent = new Student({
        name,
        studentID
      });
      newStudent  
        .save()
        .then(() => console.log(`Name: ${name} and studentID: ${studentID} were added`))
        .catch((err) => res.status(400).json("Error: " + err));

      res.send(`<h1>Document  Added</h1>`);
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB: ', error);
    })
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
