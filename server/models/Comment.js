import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
  },
  {
    timestamps: true,
  }
);

const CommentModal = mongoose.model("Comment", CommentSchema);
export default CommentModal;
