const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const hsts = require('./middleware/hsts');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors')
const connstring = 'mongodb+srv://ST10114517:pgPBm9NFR2yVS739@cluster0.0fq8rs5.mongodb.net/test';

mongoose.connect(connstring)

//middleware
app.use(helmet());
app.use(express.json());
app.use(hsts);
app.use(cors({origin: 'https://localhost:3000', optionsSuccessStatus: 200}));

//routes
app.use('/api/user', require('./routes/user'));
app.use('/api/posts', require('./routes/posts'));

//test get
app.get('/test', (req, res) => {
    res.send('test worked')
})

//server
https.createServer({
    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem')
}, app).listen(3000);