var express = require("express");
var router  = express.Router({mergeParams: true});
var Restaurant      = require("../models/restaurant");
var Lunch       = require("../models/lunch");
var middleware      = require("../middleware");

//Lunch NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
        } else {
            res.render("lunchs/new", {restaurant: restaurant});
        }
    });
});
//Lunch CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect("/restaurants"); 
        } else {
           Lunch.create(req.body.lunch, function(err, lunch){
               if(err){
                   console.log(err);
               } else {
                   restaurant.lunch.push(lunch);
                   restaurant.save(); 
                   res.redirect("/restaurants/" + restaurant._id); 
               }
           });
        }
    });
});

//Lunch EDIT ROUTE
router.get("/:lunch_id/edit", middleware.isLoggedIn, function(req, res){
    Lunch.findById(req.params.lunch_id, function(err, foundLunch){
       if(err){
           res.redirect("back");
       } else {
         res.render("lunchs/edit", {restaurant_id: req.params.id, lunch: foundLunch});
       }
    });
 });
 
 //Lunch UPDATE
 router.put("/:lunch_id", middleware.isLoggedIn, function(req, res){
    Lunch.findByIdAndUpdate(req.params.lunch_id, req.body.lunch, function(err, updatedLunch){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/restaurants/" + req.params.id );
       }
    });
 });
 
 //Lunch DESTROY ROUTE
 router.delete("/:lunch_id", middleware.isLoggedIn, function(req, res){
     //findByIdAndRemove
     Lunch.findByIdAndRemove(req.params.lunch_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Lunch deleted");
            res.redirect("/restaurants/" + req.params.id);
        }
     });
 });
module.exports = router;