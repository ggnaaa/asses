// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();
const routes = require('./routes/user');
app.use('/api', routes)

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the views directory
app.use(express.static(path.join(__dirname, 'views')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://gaganashetty07:hQR1wi2AY4Jm5kUW@cluster0.pdrn5dg.mongodb.net/cars?retryWrites=true&w=majority&appName=Cluster0', {
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.log('assddsf');
        console.error(err);
        process.exit(1); // Stop the server if MongoDB connection fails
    });

// Define a MongoDB model (e.g., User)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
});
const User = mongoose.model('User', userSchema);

// Middleware functions
// const authenticate = async(req, res, next) => {
// try {
// const token = req.header('Authorization').replace('Bearer ', '');
// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// req.user = await User.findById(decoded._id);
// next();
// } catch (error) {
// console.error(error);
// res.status(401).json({ message: 'Please authenticate' });
// throw error; // Re-throw the error
// }
// };

// const authorize = async(req, res, next) => {
// if (!req.user || !req.user.role) {
// res.status(403).json({ message: 'Forbidden' });
// } else if (req.user.role === 'admin') {
// next();
// } else {
// res.status(403).json({ message: 'Forbidden' });
// }
// };

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Routes
// app.use('/auth', require('./routes/auth'));
//app.use('/admin', authenticate, authorize, require('./routes/admin'));
app.use('/admin', require('./routes/admin'));
//app.use('/user', require('./routes/user'));

// Serve login page
// app.get('/', authenticate, (req, res) => {
// if (!req.user) {
// res.sendFile(path.join(__dirname, 'views', 'login.html'));
// } else {
// res.redirect('/user/cars');
// }
// });

// Serve admin dashboard
// app.get('/admin/dashboard', authenticate, authorize, (req, res) => {
// res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'));
// });

// Serve user cars view
app.get('/user/cars', (req, res) => {
    console.log(req)
    res.sendFile(path.join(__dirname, 'views', 'user-cars.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port $ { PORT }'));

// index.js
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://gaganashetty07:hQR1wi2AY4Jm5kUW@cluster0.pdrn5dg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
// // useNewUrlParser: true,
// // useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));
