require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();


// Router
const tourRoute = require("./routes/tour.route");


// Static folder
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(express.json());


// MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Kết nối MongoDB thành công");
    })
    .catch((err) => {
        console.log(err);
    });


// Routes
app.use("/", tourRoute);


app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});