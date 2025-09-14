const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');



app.use('/', express.static('public'));



app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    fs.readFile('./budget.json', 'utf8', function (err, text) {

        if (err) {
            return res.status(500).send('Error reading budget file');
        }
        var data = JSON.parse(text);
        res.json(data);
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});