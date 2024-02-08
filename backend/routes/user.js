const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requireLogin = require("../middleware/requireLogin");

router.get("/user/:id", (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      //   res.json(user);
      POST.find({ postedBy: req.params.id })
        .populate("postedBy", "_id")
        .sort("-createdAt")
        .exec()
        .then((post) => {
          if (post) {
            res.status(200).json({ user, post });
          } else {
            return res.status(422).json({ error: err });
          }
        })
        .catch((err) => {
          return res.status(404).json({ error: "user not found" });
        });
    });
});

// router.put("/follow", requireLogin, (req, res) => {
//   USER.findByIdAndUpdate(
//     req.body.followId,
//     {
//       $push: { followers: req.user._id },
//     },
//     {
//       new: true,
//     },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       }
//       USER.findByIdAndUpdate(
//         req.user._id,
//         {
//           $push: { following: req.body.followId },
//         },
//         {
//           new: true,
//         }
//       )
//         .then((result) => res.json(result))
//         .catch((err) => {
//           return res.status(422).json({ error: err });
//         });
//     }
//   );
// });

router.put("/follow", requireLogin, async (req, res) => {
  try {
    const updatedFollowedUser = await USER.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      {
        new: true,
      }
    ).exec();

    const updatedCurrentUser = await USER.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId },
      },
      {
        new: true,
      }
    ).exec();

    res.json(updatedCurrentUser);
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    const updatedFollowedUser = await USER.findByIdAndUpdate(
      req.body.followId,
      {
        $pull: { followers: req.user._id },
      },
      {
        new: true,
      }
    ).exec();

    const updatedCurrentUser = await USER.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body.followId },
      },
      {
        new: true,
      }
    ).exec();

    res.json(updatedCurrentUser);
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

// router.put("/unfollow", requireLogin, (req, res) => {
//   USER.findByIdAndUpdate(
//     req.body.followId,
//     {
//       $pull: { followers: req.user._id },
//     },
//     {
//       new: true,
//     },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       }
//       USER.findByIdAndUpdate(
//         req.user._id,
//         {
//           $pull: { following: req.body.followId },
//         },
//         {
//           new: true,
//         }
//       )
//         .then((result) => res.json(result))
//         .catch((err) => {
//           return res.status(422).json({ error: err });
//         });
//     }
//   );
// });

router.put("/uploadProfilePic", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    {
      $set: { Photo: req.body.pic },
    },
    {
      new: true,
    }
  )
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

module.exports = router;
