const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    days: Number,
    description: String,
    image: String
});

module.exports = mongoose.model("Tour", tourSchema);