const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// env configurations
dotenv.config();

// routes import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

// mongodb connection
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes); 

// create variables of env file
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || "development";

// listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${DEV_MODE} mode on port no ${PORT} ${colors.green("✓")}`
  );
});
