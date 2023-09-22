import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      max: 500,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
        type: Array,
        default: [],
      },
  },
);

const Post = mongoose.model("Post", PostSchema);

export default Post;