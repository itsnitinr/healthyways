// Require dependencies
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.config");
const {
  routeNotFound,
  errorHandler,
} = require("./middlewares/error.middleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Express server
const app = express();

// Parse JSON body
app.use(express.json());

// Log requests
if (process.env.NODE_ENV === "development") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/foods", require("./routes/food.routes"));
app.use("/api/orders", require("./routes/order.routes"));

// Error middlewares
app.use(routeNotFound);
app.use(errorHandler);

// Start listening to requests
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
