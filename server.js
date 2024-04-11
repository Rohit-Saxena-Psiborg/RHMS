require("dotenv").config("./env");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const dbConnect = require("./db/conn");
const bodyParser = require("body-parser");
const auth = require("./Routes/authRoute");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use((err,req,res,next)=>{
//   console.log("Error",err.status)
// })
app.use("/api/v1", auth);
dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("connection database error");
  });