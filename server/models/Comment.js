import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const CommentModal = mongoose.model("Comment", CommentSchema);
export default CommentModal;
