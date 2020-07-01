const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

// Connect database
connectDB();

// Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => {
    res.send('DevSquad API...')
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log(`Server is started and running on port: ${PORT}`));
