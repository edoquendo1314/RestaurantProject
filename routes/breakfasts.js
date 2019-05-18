var express = require("express");
var router  = express.Router({mergeParams: true});
var Restaurant      = require("../models/restaurant");
var Breakfast       = require("../models/breakfast");
var middleware      = require("../middleware");

//Breakfast NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    console.log(req.params.id);
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
        } else {
            res.render("breakfasts/new", {restaurant: restaurant});
        }
    });
});
//Breakfast CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect("/restaurants"); 
        } else {
           Breakfast.create(req.body.breakfast, function(err, breakfast){
               if(err){
                   console.log(err);
               } else {
                   restaurant.breakfast.push(breakfast);
                   restaurant.save(); 
                   res.redirect("/restaurants/" + restaurant._id); 
               }
           });

        }
    });
});

//Breakfast EDIT ROUTE
router.get("/:breakfast_id/edit", middleware.isLoggedIn, function(req, res){
    Breakfast.findById(req.params.breakfast_id, function(err, foundBreakfast){
       if(err){
           res.redirect("back");
       } else {
         res.render("breakfasts/edit", {restaurant_id: req.params.id, breakfast: foundBreakfast});
       }
    });
 });
 
 //Breakfast UPDATE
 router.put("/:breakfast_id", middleware.isLoggedIn, function(req, res){
    Breakfast.findByIdAndUpdate(req.params.breakfast_id, req.body.breakfast, function(err, updatedBreakfast){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/restaurants/" + req.params.id );
       }
    });
 });
 
 //Breakfast DESTROY ROUTE
 router.delete("/:breakfast_id", middleware.isLoggedIn, function(req, res){
     //findByIdAndRemove
     Breakfast.findByIdAndRemove(req.params.breakfast_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Breakfast deleted");
            res.redirect("/restaurants/" + req.params.id);
        }
     });
 });

module.exports = router;