const User = require('./UserModel');
const Post = require('./PostModel');
const Comment = require('./CommentModel');

Post.belongsTo(User,{
    foreignKey:'user_id',
});
Comment.belongsTo(User,{
    foreignKey:'user_id',
});
Post.hasMany(Comment,{
    foreignKey:'post_id',
});

module.exports={ User, Post, Comment };
