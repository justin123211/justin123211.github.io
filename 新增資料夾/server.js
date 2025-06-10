const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { height, weight } = req.body;
    const bmi = weight / (height * height);
    const entry = `Height: ${height}, Weight: ${weight}, BMI: ${bmi.toFixed(2)}\n`;
    
    fs.appendFile('data.txt', entry, (err) => {
        if (err) {
            return res.status(500).send('Failed to save data');
        }
        res.send({ bmi: bmi.toFixed(2) });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
