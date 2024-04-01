const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

router.post('/createuser', [
    body('email', 'Please enter correct credentials').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 })
], async (req, res) => {
let success = false;
    try {
        // Validating the request of the user using mongoose-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log("Error aa gaya")
            return res.status(400).json({ success, errors: errors.array() });
        }

        // Checking if the user already exists in the database 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // console.log(user)
            return res.status(400).json({ success, error: "email already exists" });
        }

        const JWT_SECRET = "Boi$Boi#"
        // Hashing the password that the user has entered 
        var salt = bcrypt.genSaltSync(10);
        var hashedPass = bcrypt.hashSync(req.body.password, salt);

        // creating the user in the database
        user = await User.create({
            name: req.body.name,
            password: hashedPass,
            email: req.body.email
        });

        const data = { user: { id: user.id } };
        // Passing the id of the particular user as assess token
        var authToken = jwt.sign(data, JWT_SECRET);
        // console.log({ authToken })
        success = true;
        return res.json({ success, authToken })
    }

    // console.log(user);
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error: "Email address already exists"})});
    catch (err) {
        return res.status(500).json({ error: "internal server error" })
    }
})





// Endpoint For logging-in the user
router.post('/login', [
    body('email', 'Please enter correct credentials').isEmail(),
    body('password', 'Please enter correct credentials').exists(),
], async (req, res) => {
let success = false;
    try {
        // Validating the request of the user using mongoose-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log("Error aa gaya >>> empty jaisa kuch")
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;
        // Checking if the user exists in the database using their email
        let user = await User.findOne({ email });
        if (!user) {
            // console.log(user)
            return res.status(400).json({ success, error: "Please enter the correct credentials" });
        }

        // comparing the hash of the entered password with the one saved in the database
        const passCompare = bcrypt.compare(password, user.password)
        if (!passCompare) {
            // console.log("error aa gya >>> compare")
            return res.status(400).json({ success, error: "Please enter the correct credentials" });
        }

        const JWT_SECRET = "Boi$Boi#"
        // Retreiving the id of the user from the database
        const data = { user: { id: user.id } };
        // Passing the id of the particular user as assess token
        var authToken = jwt.sign(data, JWT_SECRET);
        // console.log({ authToken })
        success = true;
        return res.json({ success, authToken })
    }

    catch (err) {
        res.status(500).json({ success, error: "internal server error" })
        // console.log("Error aa gya >>> catch")
        return;
    }
})


// Making another endpoint for verifying the auth token of the user
router.post("/getuser", [
    body('email', 'Please enter correct credentials').isEmail(),
    body('password', 'Please enter correct credentials').exists()
], fetchuser, async (req, res) => {
let success = false;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.json({ success, user });
    }
    catch (err) {
        res.status(500).send("internal server error")
        // console.log("Error aa gya >>> catch")
        console.error(err.message);
        return;
    }
})

module.exports = router;