const router = require("express").Router();
const { User } = require("../../models");

//add a user

router.post('/',(req,res)=>{
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    .then(dbUserData=>{
        req.session.save(()=>{
            req.session.userId=dbUserData.id;
            req.session.username=dbUserData.username;
            req.session.email=dbUserData.email;
            req.session.loggedIn=true;
            req.json(dbUserData);
        });
    })
    .catch(err=>{
        req.status(500).json(err);
    });
});

//user login

router.post('/login',(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(dbUserData=>{
        if(!dbUserData){
            res.status(400).json();
            return;
        }
        const passwordValid=dbUserData.checkPassword(req.body.password);

        if(!passwordValid){
            res.status(400).json();
            return;
        }
        req.session.save(()=>{
            req.session.userId=dbUserData.id;
            req.session.email=dbUserData.email;
            req.session.loggedIn=true;
            res.json();
        });
    });
});

//logout user
router.post('/logout',(req,res)=>{
    if(req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(204).end();
        });
    }
    else{
        res.status(404).end();
    }
});

//delete user

router.delete('/user/:id',(req,res)=>{
    User.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(dbUserData=>{
        if(!dbUserData){
            res.status(404).json();
            return;
        }
        res.json(dbUserData);
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});

//export
module.exports = router;