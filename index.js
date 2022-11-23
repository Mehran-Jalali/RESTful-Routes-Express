const express = require("express");
const app = express();
const path = require(`path`);
const methodOverride = require(`method-override`);
const { v4: uuid } = require(`uuid`);

//This code is used for explaining what (req.body) is .
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(methodOverride("_method"));
// here for JSON Parsing
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
app.use(express.json());
//==================================================================
app.set("views", path.join(__dirname, `views`));
app.set(`view engine`, "ejs");

let comments = [
  {
    id: uuid(),
    username: `Mehran`,
    comment: `LOL that is so funny!`,
  },
  {
    id: uuid(),
    username: `Behnam`,
    comment: `I hate bothering people!`,
  },
  {
    id: uuid(),
    username: `Sarro`,
    comment: `I'd like to help people!`,
  },
  {
    id: uuid(),
    username: `Marry`,
    comment: `Woof that's so fucken terrible!`,
  },
];
//1> Display all comments with a verb <GET>
// ---> path: /comments
app.get(`/comments`, (req, res) => {
  res.render(`comments/index`, { comments });
});
//----------------------------

//2> Creating new comments need 2 route : one for <GET> the form we want to create comment there and other for
//   <POST> the created comment
// ---> path: /comments/new
app.get(`/comments/new`, (req, res) => {
  res.render(`comments/new`);
});
app.post(`/comments`, (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect(`/comments`);
});
//-----------------------------

//3> Show Details of one specific things like comment here so It's should be a <GET> request
// ---> path: /comments/:id

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});
//---------------------------

//4> Updating one specific comment with a verb <PATCH> (the browser can't do that so we use Postman app)
// ---> path: /comments/:id

app.patch(`/comments/:id`, (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newComment;
  res.redirect(`/comments`);
});
//--------------------------------

//5> Editing needs to get a form for editing the comment as a <GET> request.
// ---> path: /comments/:id/edit

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});
//--------------------------------

//6> Deleting/Destroying needs to get a form for deleting the comment as a <DELETE> request.
// ---> path: /comments/:id
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  res.send("This is GET index.js /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Ok, Here you are your ${meat} meat & ${qty}KG quantity`);
});

app.listen(3000, () => {
  console.log("on port 3000");
});
