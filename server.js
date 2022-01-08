const express = require('express');
const { dbConnection } = require('./config/db');
const app = express();
const dotenv = require('dotenv').config({path: './config/config.env'});

// Routes 
const userRoutes = require('./src/users/routes/user.routes');

// PORT
const port = process.env.PORT || 5000;

// body parse 
app.use(express.json());

// db connection 
dbConnection();

// load routes
app.use('/api/v1/users', userRoutes);

//app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server is running and listening on port ${port}!`))