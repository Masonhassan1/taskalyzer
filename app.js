const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

// Sub-Routes
const loginRoutes = require('./api/routes/loginRoutes');
const taskRoutes = require('./api/routes/taskRoutes');

// Connection to the mongodb database
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }
);

// Middlewares
app.use(morgan('dev')); // Loggin middleware
app.use(bodyparser.urlencoded({ extended: false })); // Body-parser for url encoded data
app.use(bodyparser.json()); // Body-parser for JSON data

// CORS Handling middle-ware
app.use((req, res, next) => {
    // In the production build, replace "*" with the url of the client side application
    // [Restricting for only specified domain]
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Route handlers
app.use('/api/auth/', loginRoutes);
app.use('/api/tasks/', taskRoutes);

// Error handling middleware for bad requsets
app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
});

// Error handling middleware for function/database errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
    next();
});

module.exports = app;
