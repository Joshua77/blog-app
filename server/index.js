const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");


const authRoute = require("./routes/auth");
const userRoute = require("./routes/Users");
const postRoute = require("./routes/Post");
const categoryRoute = require("./routes/category");

require("dotenv").config();
app.use(express.json());
mongoose.set("strictQuery", false);

// check all these 4 properties - useFindAndModify: true

mongoose
  .connect("mongodb+srv://Joshua:x8qY55ZV6FRyJtAF@cluster0.p1ygta5.mongodb.net/blogwebsite?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(console.log("Connected to MongoDb"))
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "images")
    },

    filename: (req, file, cb)=>{
        cb(null, req.body.name);
    }
  });

  const upload = multer({storage: storage});

  app.post("/api/upload", upload.single("file"),
  (req, res)=>{res.status(200).json("File uploaded")});

// app.use("api/routes/auth", authRoute);
app.use("api/auth", authRoute);
app.use("api/Users", userRoute);
app.use("api/Post", postRoute);
app.use("api/category", categoryRoute);

app.listen("10533", () => {
  console.log("Backend Running");
});
