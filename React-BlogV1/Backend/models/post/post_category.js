module.exports = (sequelize,DataType) => {
    const Category = sequelize.define('Category',{
        category:{
            type:DataType.STRING(100),
            allowNull:false,
        }
    })

    Category.associate = (db) => {
        db.Category.hasMany(db.Post);
    }
    return Category;
}