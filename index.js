//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "awdawdawdawd";
const contactContent = "awdawdawdawdaw.";
const projectContent = "awdawdawdawd.";

const index = express();

index.set('view engine', 'ejs');

index.use(bodyParser.urlencoded({ extended: true }));
index.use(express.static("public"));

// Sample blog posts as dictionaries
const posts = [
  { title: "Sample Title 1", content: "Sample Content 1" },
  { title: "Sample Title 2", content: "Sample Content 2" },
  { title: "Sample Title 1", content: "Sample Content 1" },
  { title: "Sample Title 2", content: "Sample Content 2" },
  { title: "Sample Title 1", content: "Sample Content 1" },
  { title: "Sample Title 2", content: "Sample Content 2" },
  { title: "Sample Title 1", content: "Sample Content 1" },
  { title: "Sample Title 2", content: "Sample Content 2" },
  { title: "Sample Title 1", content: "Sample Content 1" },
  { title: "Sample Title 2", content: "Sample Content 2" },
  { title: "Sample Title 1", content: "Sample Content 1" },
  { title: "Sample Title 2", content: "Sample Content 2" }
];

index.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

index.get("/compose", function (req, res) {
  res.render("compose");
});

index.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});

index.get("/posts/:postId", function (req, res) {
  const postId = req.params.postId;

  if (postId >= 0 && postId < posts.length) {
    const post = posts[postId];
    res.render("post", {
      title: post.title,
      content: post.content
    });
  } else {
    res.status(404).send("Post not found");
  }
});

index.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

index.get("/projects", function (req, res) {
  res.render("projects", { projectContent: projectContent });
});

index.listen(3000, function () {
  console.log("Server started on port 3000");
});
