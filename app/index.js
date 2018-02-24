const express = require('express');
const app = express();

const PORT_NUMBER = process.env.PORT_NUMBER || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT_NUMBER, () => {
    console.log(`Example app listening on port 3000!`);
})

