const express = require("express");
// const mysql = require("mysql");

const bodyParser = require("body-parser");
const app = express();
const usersRepo = require("./repositories/users");
const connection = require("./database");
const db = require("./database");

app.use(bodyParser.urlencoded({ extended: true }));
const {
  requireUsername,
  requireEmail,
  requireContact,
  requireComments,
} = require("./validators");

//--------------------------Brand Form  data--------------------------------------------

app.get(
  "/",
  [requireUsername, requireEmail, requireContact, requireComments],
  (req, res) => {
    const { username, email, contact, comments } = req.body;

    //to display data on browser
    // let sql = "SELECT * FROM user_info";
    // connection.query(sql, function (err, results) {
    //   if (err) throw err;
    //   res.send(results);
    // });

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
  
  //to insert data into json file
  // const user = await usersRepo.create({ username, email, contact, comments });

  const sql = `INSERT INTO user_info (user_name, email, contact, comments) VALUES ("${username}", "${email}", "${contact}", "${comments}")`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    // req.flash("success", "Data added successfully!");
    // res.redirect("/");
  });

  res.send("Submitted");
});
//------------------------------------------------------------------------------------------------

app.listen(3000, () => {
  console.log("Running on PORT3K");
  connection.connect(function (err) {
    if (err) throw err;
    console.log("database connected");
  });
});

module.exports = connection;
