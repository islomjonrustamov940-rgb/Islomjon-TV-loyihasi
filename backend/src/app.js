require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { clerkMiddleware, getAuth } = require('@clerk/express');

const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

const movieRoutes = require('./routes/movie.routes');

app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      message: 'Backend ishladi!!!',
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Kolleksiya API',
      version: '1.0.0',
      endpoints: ['GET /health', 'GET /api/movies']
    }
  });
});

app.get('/whoami', (req, res) => {
  const { userId, sessionId, sessionClaims } = getAuth(req);
  res.json({
    success: true,
    data: {
      userId,
      sessionId,
      hasClaims: !!sessionClaims,
      authOnReq: req.auth ?? null,
    }
  });
});

// SHU YERDAGI YO'L '/api/movies' DEB O'ZGARTIRILDI:
app.use('/api/movies', movieRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint topilmadi'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ZodError') {
    return res.status(400).json({ success: false, error: err.issues });
  }
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Serverda xatolik yuz berdi'
  });
});

module.exports = app;