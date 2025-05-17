const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./Routes/authRoutes");
const bookRoutes = require("./Routes/bookRoutes");
const myBookRoutes = require("./Routes/myBookRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(
  cors({
    origin: "https://booklibrarymanagment.netlify.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/mybooks", myBookRoutes);

// MongoDb Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`App is Running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
