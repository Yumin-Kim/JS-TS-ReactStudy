module.exports = (sequelize,DataType) => {
    const Post_image = sequelize.define('Post_image',{
        src:{
            type:DataType.STRING(300),
            allowNull:false,
        }
    })

    Post_image.associate = (db) => {
        db.Post_image.belongsTo(db.Post)
    } 

    return Post_image;

}