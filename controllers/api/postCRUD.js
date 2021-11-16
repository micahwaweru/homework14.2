const router = require('express').Router();
const { Post, Comment, User }=require('../../models');
//add auth


//add a new post
router.post('/',(req,res)=>{
    Post.create({ ...req.body,userId:req.session.userId })
    .then(newPost=>{
        res.json(newPost);
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});

//update a post
router.put('/:id',(req,res)=>{
    Post.update(req.body,{
        where:{
            id:req.params.id
        }
    })
    .then(affectedRows=>{
        if(affectedRows>0){
            res.status(200).end();
        }
        else{
            res.status(404).end();
        }
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});

//delete a post
router.delete('/:id',(req,res)=>{
    Post.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(affectedRows=>{
        if(affectedRows>0){
            res.status(200).end();
        }
        else{
            res.status(404).end();
        }
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});

//export
module.exports=router;