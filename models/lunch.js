var mongoose = require("mongoose");

var lunchSchema = mongoose.Schema({
    food: String,
    price: Number
});

module.exports = mongoose.model("Lunch", lunchSchema);