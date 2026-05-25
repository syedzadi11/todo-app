import app from"./src/app.js";
import dotenv from "dotenv";
import db from "./src/models/index.js";


dotenv.config();

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});