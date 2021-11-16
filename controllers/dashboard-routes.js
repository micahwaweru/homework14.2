const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

//get posts associated with user
router.get('/',withAuth,(req,res)=>{
    Post.findAll({
        where:{
            userId:req.session.userId
        }
    })
    .then(dbPostData=>{
        const posts=dbPostData.map((post)=>post.get({ plain: true}));
            res.render('all-posts-admin',{
                layout: 'dashboard',
                posts
            });
    })
    .catch(err=>{
        console.log(err);
        res.redirect('login');
    });
});

//get new post handlebar
router.get('/new',withAuth,(req,res)=>{
    res.render('new-post',{
        layout:'dashboard'
    });
});

//edit post by postID
router.get('/edit/:id',withAuth,(req,res)=>{
    Post.findByPk(req.params.id)
    .then(dbPostData=>{
        if(dbPostData){
            const post = dbPostData.get({ plain:true });
            res.render('edit-post',{
                layout: 'dashboard',
                post
            });
        }
        else{
            res.status(404).end();
        }
    })
    .catch(err=>{
        res.status(500).json(err)
    });
});

//export
module.exports=router;