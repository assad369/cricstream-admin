const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/error');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const streamRoutes = require('./routes/streamRoutes');
const liveTvRoutes = require('./routes/liveTvRoutes');
const highlightRoutes = require('./routes/highlightRoutes');
const socialLinkRoutes = require('./routes/socialLinkRoutes');
const baseUrlRoutes = require('./routes/baseUrlRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const adRoutes = require('./routes/adRoutes');
const statsRoutes = require('./routes/statsRoutes');
const configRoutes = require('./routes/configRoutes');

const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/streams', streamRoutes);
app.use('/api/live-tv', liveTvRoutes);
app.use('/api/highlights', highlightRoutes);
app.use('/api/social-links', socialLinkRoutes);
app.use('/api/base-urls', baseUrlRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/config', configRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;