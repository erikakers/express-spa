/* eslint new-cap: [2, {"capIsNewExceptions": ["Server"]}] */

import express from 'express';
import kraken from 'kraken-js';
import { join } from 'path';
import webpack from 'webpack';

const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 5000;
const factory = require('./webpack.factory');
const compiler = webpack(factory({
    env: process.env.NODE_ENV,
    typescript: true
}));

compiler.run((error, stats) => {
    if (error) {
        console.log(error);
    } else { // eslint-disable-line
        console.log(stats.toString());
    }
});

app.use(kraken());

app.use(express.static( join(__dirname, 'public') ));

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

http.listen(port, (error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log(`${process.env.NODE_ENV} server running on port: ${port}`);
});
