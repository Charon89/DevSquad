const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        await res.json(user);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error')
    }
});

// @route   POST api/auth
// @desc    Authenticate User and get token
// @access  Public

router.post('/', [
        check('email', 'Please include an email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        try {
            let user = await User.findOne({email});
            // See if user exists
            if (!user) {
                return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
            }

            // Return JWT
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: 360000},
                (err, token) => {
                    if (err) throw err;
                    console.log("Auth token: " + token);
                    res.json({token});
                })
        } catch (err) {
            console.log(err.error);
            return res.status(500).send('Authentication server error')
        }

    }
)
;

module.exports = router;
