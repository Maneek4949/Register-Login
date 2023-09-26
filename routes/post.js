import express from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';
import jwtAuth from '../middleware/jwtauth.js';


const router = express.Router();
// Create a new post
router.post("/", async(req, res) => {
    const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({ message: 'Post created successfully',savedPost});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts
router.get("/",jwtAuth, async(req, res) => {
    res.json({ posts: await Post.find({})});
});
//update post

router.put("/:id/content", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      post.content=req.body.content
      post.save();
      res.status(200).json("the post has been edited");
    } else {
      res.status(403).json("you can edit only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delet Post
router.delete("/:id/delete", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like/dislike a post
router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.username)) {
        await post.updateOne({ $push: { likes: req.body.username } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.username } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
// Add a comment to a post
router.put("/:id/comment", async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $push: { comments:  req.body.comment}});
    res.status(200).json("Comment sucessfull");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get comments for a post
router.get("/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    const comments = Comments[postId] || [];
    res.json({ comments });
});


export default router;