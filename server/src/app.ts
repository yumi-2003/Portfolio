import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);

export default app;
