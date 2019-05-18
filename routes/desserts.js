var express = require("express");
var router  = express.Router({mergeParams: true});
var Restaurant      = require("../models/restaurant");
var Dessert       = require("../models/dessert");
var middleware      = require("../middleware");

//Dessert NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
        } else {
            res.render("desserts/new", {restaurant: restaurant});
        }
    });
});
//Dessert CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect("/restaurants"); 
        } else {
           Dessert.create(req.body.dessert, function(err, dessert){
               if(err){
                   console.log(err);
               } else {
                   restaurant.dessert.push(dessert);
                   restaurant.save(); 
                   res.redirect("/restaurants/" + restaurant._id); 
               }
           });
        }
    });
});

//Dessert EDIT ROUTE
router.get("/:dessert_id/edit", middleware.isLoggedIn, function(req, res){
    Dessert.findById(req.params.dessert_id, function(err, foundDessert){
       if(err){
           res.redirect("back");
       } else {
         res.render("desserts/edit", {restaurant_id: req.params.id, dessert: foundDessert});
       }
    });
 });
 
 //Dessert UPDATE
 router.put("/:dessert_id", middleware.isLoggedIn, function(req, res){
    Dessert.findByIdAndUpdate(req.params.dessert_id, req.body.dessert, function(err, updatedDessert){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/restaurants/" + req.params.id );
       }
    });
 });
 
 //Dessert DESTROY ROUTE
 router.delete("/:dessert_id", middleware.isLoggedIn, function(req, res){
     //findByIdAndRemove
     Dessert.findByIdAndRemove(req.params.dessert_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Dessert deleted");
            res.redirect("/restaurants/" + req.params.id);
        }
     });
 });

module.exports = router;