const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ Define proper CORS options
const corsOptions = {
    origin: "https://demo-job-portal-client-seven.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Apply CORS & handle preflight requests
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Parse cookies and JSON
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

// ✅ Custom Middleware
const { authenticateUser } = require("./Middleware/UserAuthenticationMiddleware");

// ✅ Routers
const JobRouter = require("./Router/JobRouter");
const UserRouter = require("./Router/UserRouter");
const AuthRouter = require("./Router/AuthRouter");
const AdminRouter = require("./Router/AdminRouter");
const ApplicationRouter = require("./Router/ApplicationRouter");

// ✅ Route Setup
app.use("/api/v1/Jobs", authenticateUser, JobRouter);
app.use("/api/v1/Users", authenticateUser, UserRouter);
app.use("/api/v1/Auth", AuthRouter);
app.use("/api/v1/Admin", authenticateUser, AdminRouter);
app.use("/api/v1/Application", authenticateUser, ApplicationRouter);

module.exports = app;
