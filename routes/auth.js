import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Handling the root route and rendering the "home.ejs" template
router.get("/", (req, res) => {
    res.render("home.ejs");
});

// Handling the "/register" route and rendering the "register.ejs" template
router.get("/register", (req, res) => {
    res.render("register.ejs");
});

// Handling the "/login" route and rendering the "login.ejs" template
router.get("/login", (req, res) => {
    res.render("login.ejs");
});

// Handling the POST request to register a new user
router.post("/register", async (req, res) => {
    try {
        const found = await User.find({ username: req.body.username, email: req.body.email });
        if (found.length > 0) {
            res.status(201).json({ message: 'User Already Exists' });
        } else {
            const newUser = new User({ email: req.body.email, password: req.body.password, username: req.body.username });
            await newUser.save();
            console.log('User Created');
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Handling the POST request for user login
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username, password: req.body.password });
        if (user.length > 0) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Login failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Handling the "/forget-password" route and rendering the "forget.ejs" template
router.get("/forget-password", (req, res) => {
    res.render("forget.ejs");
});

// Handling the POST request to reset a user's password
router.post('/forget-password', async (req, res) => {
    try {
        const change = await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.password });
        if (change) {
            return res.status(201).json({ message: 'Password Reset Successful' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

export default router;
