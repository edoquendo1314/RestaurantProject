var mongoose = require("mongoose");

var dinnerSchema = mongoose.Schema({
    food: String,
    price: Number
});

module.exports = mongoose.model("Dinner", dinnerSchema);