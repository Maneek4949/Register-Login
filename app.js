import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

const Users=[]

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("home.ejs")
})

app.get("/register",(req,res)=>{
    res.render("register.ejs")
})


app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

app.post("/register",(req,res)=>{
    const { username, email, password } = req.body;
    Users.push({ username, email, password });
    res.status(201).json({ message: 'User registered successfully' });
})





app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = Users.find((u) => u.username === username && u.password === password);
    if (user) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  });



app.get("/forget-password",(req,res)=>{
  res.render("forget.ejs")
})



app.post('/forget-password', (req, res) => {
  const { email } = req.body;
  const user = Users.find((u)=>{
    if (!u) {
      return res.status(404).json({ message: 'User not found' });
    }
    else{
      u.password=req.body.password
      return res.status(201).json({ message: 'Password Reset Successfull' });
    }
  });
});


app.listen(process.env.PORT || port,()=>{
    console.log("Server is Running :"+port)
})
