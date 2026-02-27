import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contacts", contactRoutes);

export default app;
