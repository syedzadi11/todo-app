import sequelize from "../config/db.config.js";
import TodoModel from "./todo.model.js";
import UserModel from "./user.model.js";

const db = {};

db.sequelize = sequelize;
db.Todo = TodoModel(sequelize);
db.User = UserModel(sequelize);


db.User.hasMany(db.Todo, { foreignKey: "userId" });
db.Todo.belongsTo(db.User, { foreignKey: "userId" });

export default db;