require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

//create an express app
const app = express();

//create a middleware -- between request and response

app.use(express.json()); //looks into the body of the request and parses nd sends it with the request

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// use routes only at a particular URL
app.use("/api/workouts", workoutRoutes);

//connect to db (connect is a asynchronous function)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB. Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
