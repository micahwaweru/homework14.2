const router = require('express').Router();
const userRoutes=require('./userRoutes');
const postRoutes=require('./postCRUD');
const commentRoutes=require('./addComment');

router.use('/user',userRoutes);
router.use('/post',postRoutes);
router.use('/comment',commentRoutes);

module.exports=router;