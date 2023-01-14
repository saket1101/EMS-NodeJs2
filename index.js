require("dotenv").config();
const express = require("express");
const app = express();

//database connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpvgcjo.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("Db connected"))
  .catch((err) => console.log("error", err.message));

// required routers
const adminRouter = require("./routers/adminRoutes");
const employeeRouter = require("./routers/employeeRouter");
const supervisiorRouter = require("./routers/supervisiorRouter");

// express middleware
app.use(express.json());

// routers middleware
app.use("/api/admin/", adminRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/supervisior", supervisiorRouter);

app.get("/", (req, res) => {
  res.send("Hellow world");
});

// server port
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port: http:localhost:${port}`);
});
