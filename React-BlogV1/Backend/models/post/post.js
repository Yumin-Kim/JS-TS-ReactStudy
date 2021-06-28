module.exports = (sequelize,DataType) =>{
    const Post = sequelize.define('Post',{
        title:{
            type:DataType.STRING(20),
            allowNull:false,
        },
        description1:{
            type:DataType.TEXT,
            allowNull:false,
        },
        description2:{
            type:DataType.TEXT,
            allowNull:true,
        },
        description3:{
            type:DataType.TEXT,
            allowNull:true,
        },
    },{
        charset:'utf8',
        collate:'utf8_general_ci',
    });

    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Post_comment);
        db.Post.hasMany(db.Post_image);
        db.Post.belongsTo(db.Category);
    }
    return Post;
}