const express = require("express");
const { connectToMongoDB } = require("./connect");
const path = require("path");
const cookieParser = require("cookie-parser");

const URL = require("./models/url");

const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const port = 8001;

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("connected to MongoDB!");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter); //Inline middleware
app.use("/user", userRouter);
app.use("/", staticRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
