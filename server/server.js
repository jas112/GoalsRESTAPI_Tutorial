const express = require('express');

// enabling colors package
const colors = require('colors');

// enabling environment variables
const dotenv = require('dotenv').config();

// Custom error handling from middleWare
const {errorHandler} = require('./middleware/errorMiddleware.js');

// DB connection
const connectDB = require('./config/db.js');

// use of environment variable of PORT
const port = process.env.PORT || 5000;

// starting db connection
connectDB();

const app = express();

// enabling access to req.body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/api/goals', (req, res) => {
//     res.json({"message": 'Get goals...'});
// });

app.use('/api/goals', require('./routes/goalRoutes.js'))

// use custom error handling from middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));