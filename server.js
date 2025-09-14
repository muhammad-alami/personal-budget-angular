const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const budget = {
    myBudget: [
    {
        title: "Eat out",
        budget: 60
    },
    {
        title: "Rent",
        budget: 465
    },
    {
        title: "Groceries",
        budget: 95
    },
    ]
};

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});