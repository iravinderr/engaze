import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// INITIALISING THE APP
const app = express();

// CORS MIDDLEWARE -> to allow the client(frontend) talk to the server(backend)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// JSON PARSING MIDDLEWARE
app.use(express.json({limit: `16kb`}));

// URL PARSING MIDDLEWARE
app.use(express.urlencoded({extended: true, limit: `16kb`}));

// STATIC MIDDLEWARE
app.use(express.static("public"));

// COOKIE PARSER MIDDLWARE
app.use(cookieParser());


// MOUNTING THE ROUTES
const api_v = `/api/v1`;

// GENERAL USER ROUTES
import authRoutes from "./routes/auth.routes.js";
app.use(`${api_v}/auth`, authRoutes);





export default app;