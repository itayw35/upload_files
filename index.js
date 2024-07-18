require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(require("cors")());
app.use(express.json());
app.use("/", require("./Routes/mainRouter"));
app.listen(PORT, () => {
  console.log("connection succeeded on port " + PORT);
});
