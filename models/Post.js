const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectID,
        ref: 'user'
    },
    text:{
        type: String,
        required: true
    },
    name: {// user
        type:String
    },
    avatar: {//picture of the user ? we add it instead of njiboha apres mn user (using populate kima drna mae profile: hit la drna haka une fois tmchi user maendo mnin ibqa ijibha that s why kndiroha qbl f variable bash tbqa endna ) li reference elih but here if he deleted his account we want the post to not be deleted as well
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    likes:[//array fih gae ud dial users li liked post
        {
            user:{
                type: Schema.Types.ObjectID,
                ref: 'user'
            }
        }
    ],
    comments:[
        {
            user:{
                type: Schema.Types.ObjectID,
                ref: 'user'
            },
            text:{
                type: String,
                required: true,
            },
            name: {
                type:String
            },
            avatar: {//here as well ela comments not be deleted  si account is deleted
                type: String
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = Post = mongoose.model('post', PostSchema);