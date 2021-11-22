const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//Get user model
const User = require('../../models/User');

//@route        POST api/users
//@desc         Register route
//@access       Public

router.post('/', 
    [
        //check(input, error)
    check('name', 'Name is required')
    .not().isEmpty(),

    check('email', 'Please include a valid email')
    .isEmail(),

    check('password', 'Please enter a password with 6 or more characters')
    .isLength({ min: 6 })
    ],

    async (req, res) => {

        //object of the data that will be sent to this route in order to work we need to (initialize the middleware of the body parser v3.2) add the express.json..  to server.js
        //console.log(req.body);


        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //validationResult ktchof [] li lfoq wash kayn chi erreur si oui status ktwli 400 instead of 200 and we return array that contains erreur (array) see postman
          return res.status(400).json({ errors: errors.array() });
        }

        //Destrcturing
        const { name, email, password  } = req.body;

        try {

            //See if user exists
            let user = await User.findOne({ email : email});//or just write email since they have the same name
       
            if(user){
               return res.status(400).json ({errors : [{msg : "User already exists"}] });//errors variable andiro fiha had msg bash it afficha : the format error response is the same as d error li lfoq but bdlna ghir msg chno fih 
            }
       
       
            //Getu users gravatar
            const avatar = gravatar.url(email, {
                s:'200', //size
                r: 'pg', //rating ?
                d: 'mm' //default image
            })

            //Creating a user
            user = new User({//instance we created from the model
                name,
                email,
                avatar,
                password
            });

            //Encrypt password
            const salt = await bcrypt.genSalt(10); //the bigger the number the more it s secure 
            user.password = await bcrypt.hash(password, salt); //user password will take the input password crypted
            
            //Save user object in the DB
            await user.save();//it gives us a promise 7it await (like the object from the db where we have the id )?



            //Return jsonwebtoken
            const payload = {// we ll put the object user that we create in a variable payload that have an id by having it from user.id 
                user: {//(new object user mashi adak li lfoq) ?
                    id: user.id//we didn't use user._id as showen in DB cause mongo darhom nfs haja
                }
            };

            jwt.sign(//we sign a token and we pass payload, secret, expiration 
                payload,//get user.id (hada howa li ghadi kon f token mcodi so howa li ghadi verifiyh wash it really exists f db)
                config.get('jwtSecret'),//get the secret token
                {expiresIn: 360000},//expitation time (sec)
                (err, token) => {//callback method 
                    if (err) throw err;
                    res.json({ token });
                }
            );

            //res.send('User registered');


       } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
       }

       


})




module.exports = router;
