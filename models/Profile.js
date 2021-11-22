const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    //Fields:

    //reference to user liaison
    user: {
    type: mongoose.Schema.Types.ObjectId, //3tina type dialo li howa schema since rah model. ola maet id li kayn f DB?
    ref: 'user'   //reference to user li f model User   
    },


    company: {
    type: String
    },

    website: {
        type: String
    },

    location: {
        type: String
    },

    status: {
        type: String,
        required: true
    },

    skills: {//type array car il peut avoir plusieurs skill
        type: [String],
        required: true
    },

    bio: {
        type: String
    },

    githubusername:{
        type: String
    },


    experiences: [//array of other fields
        {
            title: {
                type: String,
                required: true
            },
            company:{
                type: String,
                required: true
            },
            location:{
                type: String
            },
            from:{
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current:{
                type: Boolean,
                default: false
            },
            description:{
                type: String,
            }
        }
    ],

    education: [//array car il peut avoir more thn 1 and il contient plusieurs field
        {
            school: {
                type: String,
                required: true
            },
            degree:{
                type: String,
                required: true
            },
            fieldofstudy:{
                type: String
            },
            from:{
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: true
            },
            current:{
                type: Boolean,
                default: false
            },
            description:{
                type: String,
            }
        }
    ],

    social:{//object
        
        youtube:{
            type: String
        },
        twitter:{
            type: String
        },
        facebook:{
            type: String
        },
        linkedin:{
            type: String
        },
        instagram:{
            type: String
        }
    },

    date:{
        type: Date,
        default: Date.now
    }


});

module.exports = Profile = mongoose.model('profile', ProfileSchema);