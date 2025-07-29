import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { posts: posts });
});

app.get("/posts/:title", (req, res) => {
  const title = req.params.title;
  const foundPost = posts.find(post => post.title === decodeURIComponent(title));

  if (foundPost) {
    res.render("post.ejs", { post: foundPost });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/new", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
  const { title, post } = req.body;
  const date = Date.now();
  posts.push({ title, content: post, date });
  res.render('newpost.ejs', { success: true });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
