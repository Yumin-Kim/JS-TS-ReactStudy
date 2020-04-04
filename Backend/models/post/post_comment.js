module.exports = (sequelize,DataType) =>{
    const Post_comment = sequelize.define('Post_comment',{
        description: { 
            type:DataType.TEXT,
            allowNull:false,
        },
    });

    Post_comment.associate = (db) =>{
        db.Post_comment.belongsTo(db.User);
        db.Post_comment.belongsTo(db.Post);
    }
    return Post_comment;
}