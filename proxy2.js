const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(express.json()); // To parse JSON bodies

// Proxy route
app.post('/api', (req, res) => {
    const url = 'https://script.google.com/macros/s/AKfycbzA-VzreWvvwtRFX5YBBHjNTa8I13k5ao2HgGvW0YQv4-Yulpjyj0uItyJdjxW8c_QkmA/exec';

    console.log('Forwarding request:', req.body); // Log the incoming request body

    request.post({
        url: url,
        json: req.body // Forward the request body as JSON
    }, (error, response, body) => {
      

        console.log('Response from Google Apps Script:', body); // Log the response from Google Apps Script
        res.status(response.statusCode).json(body);
    });
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
