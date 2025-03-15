import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// INITIALISING THE APP
const app = express();

// CORS MIDDLEWARE -> to allow the client(frontend) talk to the server(backend)
app.use(cors({
    origin: [process.env.CORS_ORIGIN,"http://localhost:5173"],
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
const api_version = `/api/v1`;


// AUTH ROUTES
import authRoutes from "./routes/auth.routes.js";
app.use(`${api_version}/auth`, authRoutes);

// USER ROUTES
import userRoutes from "./routes/user.routes.js";
app.use(`${api_version}/user`, userRoutes);

// POST ROUTES
import postRoutes from "./routes/post.routes.js";
app.use(`${api_version}/post`, postRoutes);





export default app;