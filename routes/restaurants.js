var  express         = require("express"),
     router          = express.Router(),
     Restaurant      = require("../models/restaurant"),
     middleware      = require("../middleware");

//INDEX ROUTE
router.get("/", function(req, res){

    Restaurant.find({}, function(err, restaurants){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("restaurants/index", {restaurants: restaurants});
        }
    });
});
//===================
//NEW RESTAURANT
//CREATE RESTAURANT
//===================
//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("restaurants/new"); 
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var address = req.body.address;
    var open = req.body.open; 
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newRestaurant = {name: name, address: address, open: open, author:author}
    Restaurant.create(newRestaurant, function(err, newlyCreatedRestaurant){
        if(err){
            res.render("restaurants/new");
        } else {
            console.log(newlyCreatedRestaurant); 
            res.redirect("/restaurants"); 
        }
    });
});

//fill in all routes with a default schema with seeding
//SHOW ROUTE
router.get("/:id", function(req, res){
    Restaurant.findById(req.params.id).
    populate("breakfast").
    populate("lunch").
    populate("dinner").
    populate("dessert").
    populate("drink").
    populate("appetizer").exec(function(err,foundRestaurant){
    if(err){
        res.redirect("/restaurants");
        console.log(req.params.id);
    } else {
        console.log(foundRestaurant);
        res.render("restaurants/show", {restaurant: foundRestaurant});
    }
});
});

//EDIT ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        res.render("restaurants/edit", {restaurant: foundRestaurant});
    });
});

//UPDATE ROUTE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, updatedRestaurant){
        if(err){
            res.redirect("/restuarants");
        } else {
            res.redirect("/restaurants/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    //destroy restaurant
    Restaurant.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/restaurants");
        } else {
            res.redirect("/restaurants"); 
        }
    });
}); 

module.exports = router; 
