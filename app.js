const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.json());

// app.use((req, res, next) => {
//     console.log(`Request received: ${req.method} ${req.url}`);

//     const { token } = req.headers;

//     if (token === process.env.TOKEN)
//         next();
//     else
//         res.send('Forbidden');
// })

app.get('/', (req, res) => {
    if (process.env.NODE_ENV === 'production')
        res.send('Hello Prod!');
    else
        res.send('Hello Devinator!');
});



app.get('/read', (req, res) => {
    fs.readFile('./quotes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

app.post('/write', (req, res) => {
    const payload = req.body;
    fs.writeFile('./quotes.json', JSON.stringify(payload), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to file');
        } else {
            res.send('Payload written to file');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});