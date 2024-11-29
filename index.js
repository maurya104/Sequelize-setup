const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);

// Database connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return db.sequelize.sync(); // Sync models to the database
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('Database connection failed:', err));
