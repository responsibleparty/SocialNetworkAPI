const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const colors = require('colors');


const PORT = 3001;
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());







db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Dummy Social network API running on ${PORT}`.bgMagenta);
    });
});