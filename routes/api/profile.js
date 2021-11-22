const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {body, validationResult} = require('express-validator');
const request = require('request');//for the github route
const config = require('config');//for the github route

const Profile = require('../../models/Profile');
const User = require('../../models/User');


//@route        GET api/profile/me
//@desc         Get current user' s profile route
//@access       Private(nzido auth)
router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({user: req.user.id})//exits in profile liaison li drna
        .populate('user', ['name', 'avatar']);//can get other stuff mn user model we put the name of the model first apres argments

        if(!profile){
            return res.status(404).json({msg: 'Profile not found'})
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

});

  

//@route        GET api/profile
//@desc         Create or update user' s profile 
//@access       Private

    router.post('/',[ 
        auth,
         [
            body('status', 'Status is required').not().isEmpty(),
            body('skills', 'Skills is required').not().isEmpty(),
        ]
        ] ,
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }

            //Destructuring
            const {
                company,
                website,
                location,
                bio,
                status,
                githubusername,
                skills,
                youtube,
                facebook,
                twitter,
                instagram,
                linkedin
            } = req.body;

            //Build profile object:

            //-1
            const profileFields = {};
            profileFields.user = req.user.id;//from the token
            if(company) profileFields.company = company;
            if(website) profileFields.website = website;
            if(location) profileFields.location = location;
            if(bio) profileFields.bio = bio;
            if(status) profileFields.status = status;
            if(githubusername) profileFields.githubusername = githubusername;
            if(skills){//skills is an array ( but the iput it's just string like this : php, css,laravel)
                profileFields.skills = skills.split(',').map(skill => skill.trim());//trim to remove space
            }

            //2-Build profile.social object
            profileFields.social = {}//initialisation important / created this object to inser it into the DB
            if(youtube) profileFields.social.youtube = youtube;
            if(twitter) profileFields.social.twitter = twitter;
            if(instagram) profileFields.social.instagram = instagram;
            if(facebook) profileFields.social.facebook = facebook;
            if(linkedin) profileFields.social.linkedin = linkedin;

            try {
                let profile = await Profile.findOne({user: req.user.id});

                if(profile){
                    //Update and send the new object
                    profile = await Profile.findOneAndUpdate({user: req.user.id}, //search for profile where user.id = input mn BD profile
                        {$set: profileFields},//we update with the new inputs 
                         {new: true}
                         );
                    return res.json(profile);
                }

                   //Create a Profile
                    profile = new Profile(profileFields);//instance we created from the model
                    await profile.save();
                    res.json(profile)


            } catch (error) {
                console.log(error);
                return res.status(500).send('Server Error');
            }

         

    });

    


// @route       Get api/profile/
// @descr       Get all profiles
// @access      Public
    router.get('/', async (req, res) => {
        try {
            const profiles = await Profile.find()
            .populate('user', ['name', 'avatar']);//get all profiles and (users using populate)

            if(!profiles){
                return res.status(404).json({msg: 'Profiles not found'})
            }

            res.json(profiles);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    });


// @route       Get api/profile/user/:user_id
// @descr       Get profile by user id
// @access      Public
    router.get('/user/:user_id', async (req, res) => {//:user_id cause its a placeholder ( knzidoha f url: header mashi f body cause mashi body.user_id)
        try {
            const profile = await Profile.findOne({user: req.params.user_id})//param cause its a spaceholder
            .populate('user', ['name', 'avatar']);

            if(!profile){
                return res.status(400).json({msg: 'Profile not found'})
            }

            res.json(profile);
        } catch (error) {
            if(error.kind == 'ObjectId'){//si aeta chi form of id makaynsh : not a valid id ( bhal fih un seul chiffre ola fash nombre de chiffre li normally kikon f id)
                return res.status(404).json({msg: 'Profile not found'})
            }
            console.error(error.message);
            res.status(500).send('Server error');
        }
    });


// @route       DELETE api/profile/
// @descr       Delete profile, user, posts
// @access      Private
    router.delete('/', auth ,async (req, res) => {
        try {
            //@todo - remove users posts

            //Remove profile
            await Profile.findOneAndRemove({user: req.user.id});

            //Remove user
            await User.findOneAndRemove({_id: req.user.id});

            res.json({msg: 'User removed'});
        } catch (error) {
            res.status(500).send('Server error');
        }
    });



// @route       PUT api/profile/experience
// @desc        ADD experience to user's profile
// @access      Private
    router.put('/experience', [//drna put bhal post but we consider it as an update that s why
        auth,
        [
            body('title', 'Title is required').notEmpty(),
            body('company', 'Company name is required').notEmpty(),
            body('from', 'Starting date is invalid').notEmpty()
        ]
    ], 
    async(req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        //destructuring
        const{
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        //creting an object with the data that we submit
        const newExp = {
            title: title,//since the same name we can put just tilte, 
            company,
            location,
            from,
            to,
            current,
            description
        };
        console.log(newExp);
        try {
            let profile = await Profile.findOne({user: req.user.id});
           
            //push(0) to the experiences array (the most recent at first)  
            profile.experiences.unshift(newExp);//we can use push but we used unshift so that the newExp be at the beginning rather the end of the experience array
            await profile.save();
            res.json(profile);
            
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error ');
        }
    });


    // @route       DELETE api/profile/experience/:exp_id
    // @desc        Delete experience from profile
    // @access      Private
    router.delete('/experience/:exp_id', auth, async (req, res) =>{// :exp-id cause kndkhlo l id l url cause f frontend khaso choosi mn bhal checkbox ola list
        try {
            let profile = await Profile.findOne({user: req.user.id});//we search ina profile kayn had experience
            let removeIndex = profile.experiences.map(item => item.id).indexOf(req.params.exp_id); //we take array of experiences and we get the index of experience li bghina nhiydo hit f map knchedo les id o knqarnohom mae id li dkhlna b index.of o kretuniw l index dialo

            if(removeIndex < 0){
                return res.status(500).json({msg: "Experience doesn't exist"});
            }
            profile.experiences.splice(removeIndex, 1);//splice cause we wanna take something out remove it and we wanna take out 1 

            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    });

// @route       Put api/profile/education
// @route       Add education to user's profile
// @access      Private

    router.put('/education', [
        auth,
        [
            body('school', 'School name is required').notEmpty(),
            body('degree', 'Degree is required').notEmpty(),
            body('from', 'Starting date is required').notEmpty(),
            body('to', 'Ending date is required').notEmpty()
        ],
        async (req, res) =>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
            try {
                let profile = await Profile.findOne({user: req.user.id});
                const {
                    school,
                    degree,
                    fieldofstudy,
                    from,
                    to,
                    description,
                    current
                } = req.body;
                const newEdc = {
                    school,
                    degree,
                    fieldofstudy,
                    from,
                    to,
                    description,
                    current
                };

                profile.education.unshift(newEdc);
                await profile.save();

                res.json(profile);
            } catch (error) {
                console.error(error);
                return res.status(500).send('Server error');
            }
        }
    ]);

    // @route delete api/profile/education/:edc_id
    // delete education from user's profile
    // @access Private

    router.delete('/education/:edc_id', auth, async(req, res) =>{
        try {
            let profile =  await Profile.findOne({user: req.user.id});
            const removeIndex = profile.education.map(elt => elt.id).indexOf(req.params.edc_id);
            if(removeIndex < 0){
                return res.status(500).json({msg: "Education doesn't exist"});
            }
            profile.education.splice(removeIndex, 1);
            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    });

    // @route       Get api/profile/github/:username
    // @desc        Get user's github profile
    // @access      Public

    router.get('/github/:username',  (req, res) =>{
        try {
            const options = {
                uri: `https://api.github.com/users/${
                     req.params.username
                    }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                        'githubClientId'
                        )}&client_secret=${config.get('githubSecret')}`,
                method: 'GET',
                headers: {'user-agent': 'node.js'}
            };

            request(options, (errors, response, body) =>{
                if(errors) console.error(error);

                if(response.statusCode !== 200){
                    console.log(res);
                    return res.status(400).json({msg: 'Github profile not found'})
                }

                res.json(JSON.parse(body));//we need to parse it to json cause body is string
            })
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    })


module.exports = router;
