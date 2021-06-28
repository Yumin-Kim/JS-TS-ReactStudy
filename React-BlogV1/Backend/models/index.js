const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config")[env];
const db = {};

const sequelize= new Sequelize(config.database, config.username, config.password, config);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize,Sequelize);
db.Post = require('./post/post')(sequelize,Sequelize);
db.Category = require('./post/post_category')(sequelize,Sequelize);
db.Post_comment = require('./post/post_comment')(sequelize,Sequelize);
db.Post_image = require('./post/post_image')(sequelize,Sequelize);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
module.exports = db;

