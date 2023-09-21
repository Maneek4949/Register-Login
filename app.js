import express from "express"; 
import bodyParser from "body-parser";  
import mongoose from "mongoose";
import authRouth from "./routes/auth.js"
import 'dotenv/config'
const app = express();
const port = 3000;

// Creating an array to store user data
const Posts = [];
const Likes = {};
const Comments = {};

// Using body-parser middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files from the "public" directory
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL);


app.use("/", authRouth);

// Create a new post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    console.log(username,content)
    const postId = Posts.length + 1;
    const post = { id: postId, "username":username,"content":content, likes: 0, comments: [] };
    Posts.push(post);
    res.status(201).json({ message: 'Post created successfully', post });
});

// Get all posts
app.get("/posts", (req, res) => {
    res.json({ posts: Posts });
});

// Like a post
app.post("/posts/:id/like", (req, res) => {
    const postId = parseInt(req.params.id);
    if (Likes[postId]) {
        Likes[postId]++;
    } else {
        Likes[postId] = 1;
    }
    res.json({ message: 'Post liked successfully', likes: Likes[postId] });
});

// Add a comment to a post
app.post("/posts/:id/comment", (req, res) => {
    const postId = parseInt(req.params.id);
    const { username, text } = req.body;
    const comment = { username, text };
    if (Comments[postId]) {
        Comments[postId].push(comment);
    } else {
        Comments[postId] = [comment];
    }
    res.json({ message: 'Comment added successfully', comment });
});

// Get comments for a post
app.get("/posts/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    const comments = Comments[postId] || [];
    res.json({ comments });
});

// ... Rest of your code ...



// Starting the server on the specified port or a default port
app.listen(process.env.PORT || port, () => {
    console.log("Server is Running :" + port);
});
