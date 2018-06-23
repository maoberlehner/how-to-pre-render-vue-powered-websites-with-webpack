#!/usr/bin/env node
const compression = require(`compression`);
const express = require(`express`);
const path = require(`path`);

const PORT = 8080;

const publicPath = path.join(__dirname, `..`, `dist`);
const app = express();

app.use(compression());
app.use(`/`, express.static(publicPath));
// app.get(`/*`, (request, response) => response.sendFile(`${publicPath}/index.html`));
app.listen(PORT);

// eslint-disable-next-line no-console
console.log(`Server started!`);
// eslint-disable-next-line no-console
console.log(`http://127.0.0.1:${PORT}`);
