const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://joycelinangelia:<R1chb@by>@cluster0.gk4cylo.mongodb.net/';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const studentSchema = new mongoose.Schema({
  Task: String
});

const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.get('/students', async (req, res) => {
  try {
    const studentsList = await Student.find();
    res.json(studentsList);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

app.post('/students', async (req, res) => {
  const { Task } = req.body;
  const newRecord = new Student({ Task });

  try {
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
