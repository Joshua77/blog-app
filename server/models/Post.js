<<<<<<< HEAD
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true,
        },
        desc:{
            type: String,
            required: true,
        },
        photo:{
            type: String,
            default: "",
            required: false,
        },
        username:{
            type: String,
            required: true,
           
        },
        categories:{
            type: Array,
            required: false,
        },
        
    },
    {timestamps: true}
)

module.exports = mongoose.model("Post", PostSchema);
=======
const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const PostSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
>>>>>>> 0f9524f5b9c99b2f643060a56ba5ec8cd0e47704
