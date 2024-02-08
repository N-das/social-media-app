const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");

app.use(cors());

require("./models/model");
require("./models/post");
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createpost"));
app.use(require("./routes/user"));
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
  console.log("successfully connected");
});

mongoose.connection.on("error", () => {
  console.log("not connected");
});

app.listen(PORT, () => {
  console.log("server is running on" + PORT);
});
