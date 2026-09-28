const express = require('express');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Main API Route
app.use('/api/movies', movieRoutes);

module.exports = app;