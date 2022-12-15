const express = require("express");

const router = express.Router();

const data = require("./data");

const fs = require("fs");

router.get(`/`, (req, res, next) => {
  fs.readFile("username.txt", (err, data)=>{
    if(err){
      console.log(err);
      data = "No chat exists";
    }
    res.send(
      `${data}<form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" 
        method="POST">
        <input id="message" name="message" type="text" placeholder="write a message"></input>
        <input type="hidden" name="username" id="username">
        <button type="submit">Send</button>
        </form>`
    );
  })
});

router.post(`/`, (req, res, next) => {
  console.log(`${req.body.username} : ${req.body.message}`);
  fs.writeFile("username.txt", `${req.body.username} : ${req.body.message}`, {flag:'a'}, (err)=>{
    err ? console.log(err) : res.redirect("/");
  })
});

module.exports = router;
