const express = require('express')
const authRouter = require('./routes/auth')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
const port = 5000

dotenv.config()

app.use('/auth', authRouter)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})