// const app = require('./src/app');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cronJobs = require('./src/utils/cronJobs');
//
// // Load environment variables
// dotenv.config();
//
// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));
//
// // Start cron jobs
// cronJobs.startCronJobs();
//
// // Start server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
const app = require('./src/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cronJobs = require('./src/utils/cronJobs');
const { PORT } = require('./src/config/env');

// Load environment variables
dotenv.config();

// Check if MONGODB_URI is provided
if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        if (err.message.includes('bad auth')) {
            console.error('⚠️ Authentication failed. Check your username/password in MONGODB_URI.');
        }
        process.exit(1); // Stop server if DB connection fails
    });

// Start cron jobs
cronJobs.startCronJobs();

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
