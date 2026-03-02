import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import AppError from "./utils/AppError.js";

const app = express();

const sanitizeXssInPlace = (value: unknown): unknown => {
  if (typeof value === "string") {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  }

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      value[i] = sanitizeXssInPlace(value[i]);
    }
    return value;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    for (const key of Object.keys(record)) {
      record[key] = sanitizeXssInPlace(record[key]);
    }
  }

  return value;
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// 1️ Security first
app.use(helmet());

// 2️ CORS
const configuredOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins =
  configuredOrigins.length > 0
    ? configuredOrigins
    : ["http://localhost:5173", "http://127.0.0.1:5173"];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new AppError("CORS policy: origin not allowed", 403));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// 3️ Body parser
app.use(express.json());

// Input sanitization (Express 5 compatible)
app.use((req, _res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  if (req.query) mongoSanitize.sanitize(req.query);
  next();
});

// Block XSS (Express 5 compatible)
app.use((req, _res, next) => {
  if (req.body) sanitizeXssInPlace(req.body);
  if (req.params) sanitizeXssInPlace(req.params);
  if (req.query) sanitizeXssInPlace(req.query);
  next();
});

// 4️ Routes
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);

// 5️ Error handler
app.use(errorHandler);

export default app;
