require("dotenv").config();
const express = require("express");
const app = express();

//database connection
const dbConnect = require("./dbs/config")

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
