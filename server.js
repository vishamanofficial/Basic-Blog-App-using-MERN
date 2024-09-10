const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Node Server",
  });
});

// env configurations
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

// create variables of env file
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || "development";

// listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${DEV_MODE} mode on port no ${PORT} ${colors.green("✓")}`
  );
});
