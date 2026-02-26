import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);

export default app;
