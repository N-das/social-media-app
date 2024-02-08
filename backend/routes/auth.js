const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  //   res.json("data posted successfully");
  //   console.log(req.body.name);
  const { name, userName, email, password } = req.body;

  if (!name || !email || !userName || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then(
    (savedUser) => {
      // console.log(savedUser);
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exist with that email or username" });
      } else {
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new USER({
            name,
            email,
            userName,
            password: hashedPassword,
          });

          user
            .save()
            .then((user) => {
              res.json({ message: "signup successfully" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    }
  );
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  }
  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          // return res.status(200).json({ message: "Signed in Successfully" });
          const token = jwt.sign({ _id: savedUser.id }, jwt_secret);
          const { _id, name, email, userName } = savedUser;
          res.json({ token, user: { _id, name, email, userName } });
          console.log({ token, user: { _id, name, email, userName } });
        } else {
          return res
            .status(422)
            .json({ error: "Invalid user name or password" });
        }
      })
      .catch((err) => console.log(err));
    // console.log(savedUser);
  });
});

router.post("/googleLogin", (req, res) => {
  const { email_verified, email, name, clientId, userName, Photo } = req.body;
  if (email_verified) {
    USER.findOne({ email: email }).then((savedUser) => {
      if (savedUser) {
        // return res.status(422).json({ error: "Invalid email" });
        const token = jwt.sign({ _id: savedUser.id }, jwt_secret);
        const { _id, name, email, userName } = savedUser;
        res.json({ token, user: { _id, name, email, userName } });
        console.log({ token, user: { _id, name, email, userName } });
      } else {
        const password = email + clientId;
        const user = new USER({
          name,
          email,
          userName,
          password: password,
          Photo,
        });

        user
          .save()
          .then((user) => {
            let userId = user._id.toString();
            const token = jwt.sign({ _id: userId }, jwt_secret);
            const { _id, name, email, userName } = user;
            res.json({ token, user: { _id, name, email, userName } });
            console.log({ token, user: { _id, name, email, userName } });
            // res.json({ message: "signup successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // console.log(savedUser);
    });
  }
});

module.exports = router;
