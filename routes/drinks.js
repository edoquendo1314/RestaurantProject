var express = require("express");
var router  = express.Router({mergeParams: true});
var Restaurant      = require("../models/restaurant");
var Drink      = require("../models/drink");
var middleware      = require("../middleware");

//Drink NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
        } else {
            res.render("drinks/new", {restaurant: restaurant});
        }
    });
});
//Drink CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect("/restaurants"); 
        } else {
           Drink.create(req.body.drink, function(err, drink){
               if(err){
                   console.log(err);
               } else {
                   restaurant.drink.push(drink);
                   restaurant.save(); 
                   res.redirect("/restaurants/" + restaurant._id); 
               }
           });
        }
    });
});

//Drink EDIT ROUTE
router.get("/:drink_id/edit", middleware.isLoggedIn, function(req, res){
    Drink.findById(req.params.drink_id, function(err, foundDrink){
       if(err){
           res.redirect("back");
       } else {
         res.render("drinks/edit", {restaurant_id: req.params.id, drink: foundDrink});
       }
    });
 });
 
 //Drink UPDATE
 router.put("/:drink_id", middleware.isLoggedIn, function(req, res){
    Drink.findByIdAndUpdate(req.params.drink_id, req.body.drink, function(err, updatedDrink){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/restaurants/" + req.params.id );
       }
    });
 });
 
 //Drink DESTROY ROUTE
 router.delete("/:drink_id", middleware.isLoggedIn, function(req, res){
     //findByIdAndRemove
     Drink.findByIdAndRemove(req.params.drink_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Drink deleted");
            res.redirect("/restaurants/" + req.params.id);
        }
     });
 });


module.exports = router;