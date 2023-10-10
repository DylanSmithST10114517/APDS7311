const https = require('http');
const fs = require('fs');
const app = require('./app');

const port = 3000;

const server = https.createServer(
    {
        key: fs.readFileSync('./keys/privatekey.pem'),
        cert: fs.readFileSync('./keys/certificate.pem')
    },
    app
);

server.listen(port)
