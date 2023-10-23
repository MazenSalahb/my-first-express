const express = require("express");
const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");
const Article = require("./models/Article");
const cors = require("cors");

const app = express();

mongoose
  .connect(
    "mongodb+srv://mazen:ma01129977413@myfirstexpressjscluster.lv9nqgu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log("Error With DB Connection: ", error);
  });

app.use(express.json());
app.use(cors());

// mongodb+srv://mazen:ma01129977413@myfirstexpressjscluster.lv9nqgu.mongodb.net/?retryWrites=true&w=majority

app.get("/", (req, res) => {
  res.send("Welcome to express API");
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/test", (req, res) => {
  res.send("you visited test");
});

app.post("/addPost", (req, res) => {
  res.send("Added new post");
});

app.get("/addNums/:num1/:num2", (req, res) => {
  const sums = Number(req.params.num1) + Number(req.params.num2);
  res.send(`result: ${sums}`);
});

app.get("/sayHello", (req, res) => {
  const name = req.body.name;
  res.send(`Hola ${name}`);
});

app.get("/allPosts", (req, res) => {
  res.json({
    id: 1,
    title: "test post title 1",
    body: "test body",
  });
});

// ==================== Article ENDPOINTS ====================

// Add Article
app.post("/articles", (req, res) => {
  const reqTitle = req.body.title;
  const reqBody = req.body.body;
  if (reqTitle == "" && reqBody == "") {
    res.json({
      status: "title and body are required",
    });
  } else {
    const newArticle = new Article();
    newArticle.title = reqTitle;
    newArticle.body = reqBody;
    newArticle.likes = 0;
    newArticle
      .save()
      .then(() => {
        res.json({
          status: "success",
          article: newArticle,
        });
      })
      .catch(() => {
        res.json({
          status: "failed",
        });
      });
  }
});

// Show Articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.json({
      status: `failed ${error}`,
    });
  }
});

// Show Article by ID
app.get("/articles/:articleID", (req, res) => {
  const id = req.params.articleID;
  const article = Article.findById(id)
    .then(() => {
      res.json(article);
    })
    .catch(() => {
      res.json({
        status: "error",
      });
    });
});

// Delete Article
app.delete("/articles/:articleID", (req, res) => {
  const id = req.params.articleID;
  const article = Article.findByIdAndDelete(id)
    .then(() => {
      res.json({
        status: "success",
      });
    })
    .catch(() => {
      res.json({
        status: "error",
      });
    });
});

app.listen(3000, () => {
  console.log("listening in port 3000");
});
