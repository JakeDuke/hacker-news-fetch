const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const axios = require("axios");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/topnews", async function (req, res, next) {
  try {
    const responce = await axios.get(
      `https://news.ycombinator.com/?p=${req.query.page}`
    );
    const data = await responce.data;
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
