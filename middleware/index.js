var Restaurant = require("../models/restaurant");
var middlewareObj = {};

//MiddleWare
middlewareObj.checkRestaurantOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if(err){
                res.redirect("/restaurants"); 
            } else {
                if(restaurant.author.id.equals(req.user._id)){
                   next();
                } else {
                    res.redirect("back"); 
                }
            }
        });
    } else {
        res.redirect("back"); 
    }
}

//middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;