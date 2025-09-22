const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/', express.static('public'));



app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', (req, res) => {
  fs.readFile(__dirname + '/budget.json', 'utf8', (err, text) => {
    if (err) return res.status(500).send('Error reading budget file');
    const data = JSON.parse(text);           
    
    res.json({ data });                      
    
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});