import express from "express";

// creating an express app
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to Japa Backend");
});
app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}`);
});
