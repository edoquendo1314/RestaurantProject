var express = require("express");
var router  = express.Router({mergeParams: true});
var Restaurant      = require("../models/restaurant");
var Appetizer       = require("../models/appetizer");
var middleware      = require("../middleware");

//Appetizer NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
        } else {
            res.render("appetizers/new", {restaurant: restaurant});
        }
    });
});
//Appetizer CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect("/restaurants"); 
        } else {
           Appetizer.create(req.body.appetizer, function(err, appetizer){
               if(err){
                   console.log(err);
               } else {
                   restaurant.appetizer.push(appetizer);
                   restaurant.save(); 
                   res.redirect("/restaurants/" + restaurant._id); 
               }
           });
        }
    });
});

//Appetizer EDIT ROUTE
router.get("/:appetizer_id/edit", middleware.isLoggedIn, function(req, res){
    Appetizer.findById(req.params.appetizer_id, function(err, foundAppetizer){
       if(err){
           res.redirect("back");
       } else {
         res.render("appetizers/edit", {restaurant_id: req.params.id, appetizer: foundAppetizer});
       }
    });
 });
 
 //Appetizer UPDATE
 router.put("/:appetizer_id", middleware.isLoggedIn, function(req, res){
    Appetizer.findByIdAndUpdate(req.params.appetizer_id, req.body.appetizer, function(err, updatedAppetizer){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/restaurants/" + req.params.id );
       }
    });
 });
 
 //Appetizer DESTROY ROUTE
 router.delete("/:appetizer_id", middleware.isLoggedIn, function(req, res){
     //findByIdAndRemove
     Appetizer.findByIdAndRemove(req.params.appetizer_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Appetizer deleted");
            res.redirect("/restaurants/" + req.params.id);
        }
     });
 });


module.exports = router;