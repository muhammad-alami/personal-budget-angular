
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;


app.use(cors());


app.get('/budget', (req, res) => {
  fs.readFile(path.join(__dirname, 'budget.json'), 'utf8', (err, text) => {
    if (err) return res.status(500).send('Error reading budget file');
    const data = JSON.parse(text);
    res.json(data);
  });
});


const distPath = path.join(__dirname, '../dist/personal-budget');
app.use(express.static(distPath));
//app.get('*', (_, res) => res.sendFile(path.join(distPath, 'index.html')));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
