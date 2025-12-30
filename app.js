const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const generateRoute = require('./routes/generate');
const redirectRoute = require('./routes/redirect');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/generate', generateRoute);
app.use('/', redirectRoute);



// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

