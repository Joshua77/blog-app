const router = require("express").Router();
const User = require("../models/Users");

//updating a user, we use the PUT method
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your Account!");
  }
});

//getting/reading/fetching the user

router.get("/:id", async(req,res)=>{
        try{
            await User.findById(req.params.id);
            const { password, ...others} = User._doc;
            res.status(200).json(others)
        }
        catch(err){
            res.status(500).json(err);
        }
})

//deleting the User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  else{
    res.status(401).json("You can only delete your account!")
  }
});


module.exports = router;
