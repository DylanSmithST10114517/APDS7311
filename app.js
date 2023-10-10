const express = require('express');
const app = express();
const urlprefix = '/api';

// Define a route for the root URL
app.get(urlprefix + '/', (req, res) => {
    res.send('Hello World');
});

// Define a route for getting orders
app.get(urlprefix + '/orders', (req, res) => {
    const orders = [
        {
            id: "1",
            name: "Orange"
        },
        {
            id: "2",
            name: "Banana"
        },
        {
            id: "3",
            name: "Pear"
        }
    ];

    
    res.json({
        message: "Fruits",
        orders: orders
    });
});

module.exports = app;
