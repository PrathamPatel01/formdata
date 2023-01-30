const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const usersRepo = require("./repositories/users");

app.use(bodyParser.urlencoded({ extended: true }));
const {
  requireUsername,
  requireEmail,
  requireContact,
  requireComments,
} = require("./validators");

app.get(
  "/",
  [requireUsername, requireEmail, requireContact, requireComments],
  (req, res) => {
    const { username, email, contact, comments } = req.body;
    res.send(`
    <div>
    <form method="POST">
    <input name="username" placeholder="username" />
    <input name="email" placeholder="email" />
    <input name="contact" placeholder="contact" />
    <input name="comments" placeholder="comments" />
    <button>Submit</button>
    </form>
    </div>
    `);
  }
);

app.post("/", async (req, res) => {
  const { username, email, contact, comments } = req.body;
  const user = await usersRepo.create({ username, email, contact, comments });

  res.send("submitted");
});

app.listen(3000, () => {
  console.log("Running");
});
