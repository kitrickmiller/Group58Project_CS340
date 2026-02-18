const express = require('express');
const path = require('path');
const app = express();

const PORT = 53262;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});
