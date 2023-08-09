const router = require("express").Router();
const User = require("../models/Users");

// For the Registration Route
//install bcrypt
//we create our users here, and we do the other CRUD operations in the Users Route

router.post('/register', async(req,res)=>{
    try{
        const salt = await bcrypt.generate(10);
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });

        const User = await newUser.save();
        res.status(200).json(User);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.post('/login', async(req, res)=>{
    try{
        const User = await User.findOne({username: req.body.username})
        !User && res.status(400).json("Wrong Credentials");

        const validated = await bcrypt.compare(req.body.password, User.password);
        !validated && res.status(400).json("Wrong Password!");

        const { password, ...others} = User._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})




module.exports = router;