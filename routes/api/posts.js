const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {body, validationResult} = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');


//@route        POST api/posts
//@desc         Create a post
//@access       Private

router.post('/', [
    auth,
    [
        body('text', 'Post must not be empty').notEmpty()
    ]
],
    async(req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})//f errors kayna a method smitha array (ktjib lik array dial les erreurs) ?
        }

        try {

            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                user: req.user.id,//from token
                name: user.name,//from user li qlbna elih qbl user = await User.findById...
                avatar: user.avatar//from user li qlbna elih qbl user = await User.findById...
            });
            
            await newPost.save();
            res.json(newPost);

        } catch (error) {
            console.log(error);
            return res.status(500).send('Server Error');
        }

    });


// @route       GET api/posts
// @desc        Get all posts
// @access      Private
    router.get('/',auth , async (req, res) => {
        try {
            const posts = await Post.find().sort({date: -1});//date -1 affiche le plus recent le premier sinn par defaut l'ancien 
            res.json(posts);

        } catch (error) {
            console.log(error);
            return res.status(500).send('Server Error');
        }
    });


// @route       GET api/posts/:post_id
// @desc        Get post by post id
// @access      Private
router.get('/:post_id',auth , async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);//un seul resultat car un seul post
        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        }
        res.json(post);
    } catch (error) {
        if(error.kind == 'ObjectId'){//mashi format dial objectId type nombre de chiffre...
            return res.status(404).json({msg: 'Post not found'});
        }
        console.log(error);
        return res.status(500).send('Server Error');
    }
});


// @route       GET api/posts/:user
// @desc        Get post by user id
// @access      Private
router.get('/user_post/:user', auth, async (req, res) => {
    try {
        const post = await Post.find({user :req.params.user}).sort({date: -1});//un seul resultat car un seul post
        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        }
        res.json(post);
    } catch (error) {
        if(error.kind == 'ObjectId'){//mashi format dial objectId type nombre de chiffre...
            return res.status(404).json({msg: 'not found'});
        }
        console.log(error);
        return res.status(500).send('Server Error');
    }
});


// @route       Delete api/posts/:post_id
// @desc        Delete post by id post
// @access      Private
router.delete('/:post_id',auth , async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.post_id, user: req.user.id})//we search for the user cause incease mashi howa mol post maymknch supp
        
        if(!post){
            return res.status(401).json({msg: 'Cannot delete that post'});
        }

        await post.remove();

        res.json({msg: 'Post removed'});

    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(404).json({msg: 'Post not found'});
        }
        console.log(error);
        return res.status(500).send('Server Error');
    }
});



// @route        Put api/posts/:post_id/:like
// @desc         Like a post by id postif not already like by that user
// @access       Private
    router.put('/like/:post_id', auth, async (req, res) =>{
        try {
            const post = await Post.findById(req.params.post_id);
            if(!post){
                return res.status(404).json({msg: 'Post not found'});
            }

            //check if post has already been liked
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){//we made a function to verify by filter if the user already liked wash deja id dialo kayna f array dial likes or not and return wahed array so la kan lentgh fih ktr mn 0 rah deja lqah 
                return res.status(400).json({msg: 'Post already liked'});
            }
            post.likes.unshift({user: req.user.id});//put it at the begining of likes
            await post.save()
            res.json(post.likes);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Server Error');
        }
    });


    
// @route       PUT api/posts/:post_id/:unlike
// @desc        Unlike a post by id of post
// @access      Private
    router.put('/unlike/:like_id', auth, async (req, res) =>{
        try {
            const post = await Post.findById(req.params.like_id);
            if(!post){
                return res.status(404).json({msg: 'Post not found'});
            }
            //check if post already liked
            const likeRemoved = {...post.likes.filter(like => like.user.toString() === req.user.id)[0]};//search for the id_like where the user liked the post ya3ni kiched id-user o kichof wash kayn f array d likes
            if(Object.keys(likeRemoved).length === 0){
                return res.status(400).json({msg: 'Post has not yet been liked'});
            }
            post.likes.splice(post.likes.indexOf(likeRemoved), 1);//remove the like 
            await post.save();
            res.json(post.likes);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Server Error');
        }
    });



// @route       PUT or DELETE api/posts/comment/:post_id 
// @desc        Comment a post by id of post
// @access      Private
    router.put('/comment/:post_id', [//drna put bhal post but we consider it as an update that s why
        auth,
        [
            body('text', 'Title is required').notEmpty()
        ]
    ], async (req, res) =>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
       

        try {
            const post = await Post.findById(req.params.post_id).populate('user', ['name', 'avatar']);//can get other stuff mn user model we put the name of the model first apres argments
            
            if(!post){
                return res.status(404).json({msg: 'Post not found'});
            }

            const { text } = req.body;
            const newComment = {
                user: req.user.id,//since the same name we can put just tilte, 
                text,
                name: post.name,
                avatar: post.avatar
                
            };
        
            console.log(newComment);
            
            post.comments.unshift(newComment);//put it at the begining of likes
            await post.save()
            res.json(post.comments);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Server Error');
        }
    });


// @route       PUT api/posts/:post_id/:uncomment
// @desc        Uncomment a post by id of post
// @access      Private
router.put('/uncomment/:post_id/:comment_id', auth, async (req, res) =>{
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        }

        //Pull out comment
        const comment = await post.comments.find(item => item._id.toString() === req.params.comment_id);//or item._id.toString() = item.id
        console.log(comment);
        //Make sure comemnts exists
        if(!comment){
            return res.status(404).json({msg: 'Comment not found'});
        }

        //Check user if its the owner of the comment
        if(comment.user.toString() !== req.user.id)
        return res.status(400).json({msg: 'Post has not yet been commented by the user'});

        const RemoveIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id );//search for the id_like where the user liked the post ya3ni kiched id-user o kichof wash kayn f array d likes
        
        
        post.comments.splice(RemoveIndex, 1);//remove the like 
        await post.save();
        res.json(post.comments);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
