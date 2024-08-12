const express = require('express');
const request = require('request');
const app = express();
const port = 3001;

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specified methods
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Allow specified headers
    if (req.method === 'OPTIONS') {
        // Handle preflight requests
        return res.sendStatus(204);
    }
    next();
});

app.use(express.json()); // To parse JSON bodies

// Proxy route
app.post('/api', (req, res) => {
    const url = 'https://script.google.com/macros/s/AKfycbxyUBxlzMjoEuUqbiDmTDuFWLgfGVNgfQYZIA1d_Ee-BJ34P1pXFfK_1bzCfg8OZDghTw/exec';

    console.log('Forwarding request:', req.body); // Log the incoming request body

    request.post({
        url: url,
        json: req.body // Forward the request body as JSON
    }, (error, response, body) => {
        if (error) {
            console.error('Request error:', error);
            return res.status(500).send('Error forwarding request');
        }

        //console.log('Response from Google Apps Script:', body); // Log the response from Google Apps Script

        // Forward the response from Google Apps Script
        res.status(response.statusCode).send(body);
    });
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
