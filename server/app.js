require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const uri = process.env.DB_URL || 'mongodb://127.0.0.1:27017/auth';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Hi There, Welcome'
    });
});

app.use(require('./routes'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on server http://localhost:${PORT}...`);
});