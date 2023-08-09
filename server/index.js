<<<<<<< HEAD
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
=======
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
// const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({
  credentials:true,
  methods: ['POST', 'GET'],
  origin: 'https://blog-app-nine-gamma.vercel.app/'
  // origin:'http://localhost:3000'
}));


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

dotenv.config()



mongoose.connect('mongodb+srv://Joshua:x8qY55ZV6FRyJtAF@cluster0.p1ygta5.mongodb.net/mern_blog?retryWrites=true&w=majority');

app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id,
    });
    res.json(postDoc);
  });

});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});

app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

app.listen(4000,
  console.log("Backend Running")
);
//


>>>>>>> 0f9524f5b9c99b2f643060a56ba5ec8cd0e47704
