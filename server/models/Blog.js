import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  comments:{
    type:String
  }
},{
    timestamps:true
});

const BlogModal = mongoose.model("Blog", BlogSchema);
export default BlogModal;
