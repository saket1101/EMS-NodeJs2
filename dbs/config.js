const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpvgcjo.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => console.log("Db connected"))
  .catch((err) => console.log("error", err.message));
