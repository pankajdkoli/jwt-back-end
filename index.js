const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const userAuth = require("./routes/userAuth");

connectToMongo();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello it's me");
});

// Enable CORS only for development
app.use(cors({ origin: "http://localhost:3001" })); // only for dev

// Available routes
app.use("/auth", userAuth);

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port}`));
