const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Example users (Replace with your database users)
const users = {
    admin: { username: 'admin', password: 'adminpassword' }, // Admin user
    user: { username: 'user', password: 'userpassword' } // Regular user
};

exports.adminLogin = async(req, res) => {
    const { username, password } = req.body;

    if (username === users.admin.username && password === users.admin.password) {
        const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Admin logged in', token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
};

exports.userLogin = async(req, res) => {
    const { username, password } = req.body;

    if (username === users.user.username && password === users.user.password) {
        const token = jwt.sign({ username, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'User logged in', token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
};