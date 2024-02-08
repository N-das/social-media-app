const express = require("express");
const { default: mongoose } = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const POST = mongoose.model("POST");

router.get("/allposts", requireLogin, (req, res) => {
  POST.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router.post("/createPost", requireLogin, (req, res) => {
  const { body, pic } = req.body;
  console.log(pic);
  if (!body || !pic) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  console.log(req.user);
  //   req.user;
  const post = new POST({
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
  //   res.json("ok");
});

router.get("/myposts", requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((myposts) => {
      res.json(myposts);
    });
  // console.log(req.user);
});

router.put("/savedposts", requireLogin, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { savedPosts: req.user._id },
      // $push: { savedPosts: req.user.Photo },
      // $push: { postedBy: req.user.name },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    // .populate("savedPosts", "_id name Photo")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/unsavedPost", requireLogin, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { savedPosts: req.user._id },
      // $pull: { savedPosts: req.user.Photo },
      // $pull: { postedBy: req.user.name },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    // .populate("savedPosts", "_id name Photo")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/like", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    // .exec((err, result) => {
    //   if (err) {
    //     return res.status(422).json({ error: err });
    //   } else {
    //     res.json(result);
    //   }
    // });
    .populate("postedBy", "_id name Photo")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name Photo")
    .populate("postedBy", "_id name Photo")
    .exec()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.delete("/deletePost/:postId", requireLogin, (req, res) => {
  console.log(req.params.postId);
  POST.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id name")
    .exec()
    .then((post) => {
      // console.log(post);
      if (!post) {
        console.log("Post not found");
        return res.status(404).json({ error: "Post not found" });
      }
      // console.log(post);
      // console.log(post.postedBy._id);
      if (post.postedBy._id.toString() == req.user._id.toString()) {
        // console.log("Matched");
        post
          .deleteOne()
          .then(() => {
            return res.json({ message: "Successfully deleted" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
          });
      } else {
        return res
          .status(401)
          .json({ error: "You are not authorized to delete this post" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    });
  // .then(())
});

router.get("/myfollowingpost", requireLogin, (req, res) => {
  console.log("User Following:", req.user.following);
  POST.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

// router.get("/myfollowingpost", requireLogin, (req, res) => {
//   POST.find({ postedBy: { $in: req.user.following } })
//     .populate("postedBy", "_id name")
//     .populate("comments.postedBy", "_id name")
//     .then((posts) => res.json(posts))
//     .catch((err) => console.log(err));
// });

module.exports = router;
