const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');


//@route               GET api/auth
//@description         Get user data route
//@access              Public
router.get('/', auth, async (req, res) => {//callback method
    try {
        const user = await User.findById(req.user.id).select('-password');//we search f db user fin kayn had id li drnah mn token mn middleware auth.js et njibo data dialo sans le mot de passe
        res.json(user);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});//we we add the auth will make this route protected

    // @route              POST api/auth
    //@description         Login
    // @access             Public

    router.post('/', [
        body('email', 'Email is not valid').isEmail(),
        body('password', 'Password is required').exists()
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        //Destructuring
        const {email, password} = req.body;

        try {

        //check if user exists
        let user = await User.findOne({email});
        if(! user){
            return res.status(400).json({msg: 'Invalid credentials'})
        }
        
        //matching email with password
        const isMatch = await bcrypt.compare(password, user.password)

        if( !isMatch ){
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        //Return jwt
        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) =>{
                if(err) throw err;
                res.json({token});
            }
            )

        } catch (error) {
            res.status(500).send('Server Error');  
        }

   
});




module.exports = router;
