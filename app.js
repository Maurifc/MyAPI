// App Setup
const express = require('express')
const bodyParser = require('body-parser')

const app = express() // Create app from express
app.use(bodyParser.json()) // Include body parser

module.exports = app // Exports