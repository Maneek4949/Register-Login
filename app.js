import express from "express"; 
import bodyParser from "body-parser";  
import mongoose from "mongoose";

import authRouth from "./routes/auth.js"
import postRouth from "./routes/post.js"

import 'dotenv/config'
const app = express();
const port = 3000;

// Using body-parser middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files from the "public" directory
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL);


app.use("/", authRouth);
app.use("/posts",postRouth);

// Starting the server on the specified port or a default port
app.listen(process.env.PORT || port, () => {
    console.log("Server is Running :" + port);
});
