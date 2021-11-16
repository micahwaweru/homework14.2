const router = require('express').Router();
const { Comment } =require('../../models');
//require auth
const withAuth = require('../../utils/auth');

//add a comment
router.post('/',withAuth,(req,res)=>{
    Comment.create({ ...req.body,userId:req.session.userId })
    .then(newComment =>{
        res.json(newComment);
    })
    .catch(err=>{
        res.status(500).json(err)
    });
});

//export
module.exports=router;