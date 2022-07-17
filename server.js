const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const eventRouter = require('./routes/event');
// const mongoDBEndpoint = 'mongodb+srv://cs5500:cs5500@seaswe.tgzl7.mongodb.net/events_app?retryWrites=true&w=majority';
const mongoEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/project-SM22-lilaxuan-kevbvan-amlcheung';
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once("open", () => console.log("connect to database"));

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/event', eventRouter);

// allows code to work with heroku
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});
