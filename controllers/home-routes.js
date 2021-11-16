//help taken from activity 15

const router = require('express').Router();
// import models
const { User, Comment, Post }=require('../models');


//routes
//get all posts
router.get('/',async(req,res)=>{
    Post.findAll({
        include:[User],
    })
    .then((dbPostData)=>{
        const posts = dbPostData.map((post)=>post.get({ plain: true }));
        res.render('all-posts', { posts });
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
});

//get post by id

router.get('/post/:id',(req,res)=>{
    Post.findByPk(req.params.id,{
        include:[
            User,{
                model:Comment,
                include:[User],
            },
        ],
    })
    .then((dbPostData)=>{
        if (dbPostData){
            const post=dbPostData.get({ plain:true });
            res.render('single-post',{ post });
        }
        else{
            res.status(404).end();
        }
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
});

//login & sign up routes
router.get('/login/',(req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup',(req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/');
        return
    }
    res.render('signup');
})

//export
module.exports=router;
