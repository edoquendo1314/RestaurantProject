var mongoose = require("mongoose");

var restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    open: String, 
    //maybe make an id for the restaurant 
    //and create a middleware so that you can
    //identify when you're editing or updating
    //or deleting if there is a franchise
    //b/c you'll have to do it for all of them
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    breakfast:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Breakfast"
        }
    ],
    lunch:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lunch"
        }
    ],
    dinner:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dinner"
        }
    ],
    dessert:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dessert"
        }
    ],
    drink:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drink"
        }
    ],
    appetizer:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appetizer"
        }
    ]
});

module.exports = mongoose.model("Restaurant", restaurantSchema); 