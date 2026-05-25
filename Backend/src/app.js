// import express from "express";
// import cors from "cors";
// import todoRoutes from "./routes/todo.routes.js";
// import { errorHandler } from "./middlewares/error.middleware.js";
// import userRoutes from "./routes/user.routes.js";

// const app = express();
// app.use(express.json());
// app.use(cors({origin:"http://localhost:5173"}));


// app.use("/api", todoRoutes);
// app.use("/api", userRoutes);
// app.use(errorHandler);

// export default app;



import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import todoRoutes from "./routes/todo.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Uploads folder publicly accessible
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", todoRoutes);
app.use("/api", userRoutes);
app.use("/api", uploadRoutes);
app.use(errorHandler);

export default app;