var express = require("express");
var router  = express.Router({mergeParams: true});
var Restaurant      = require("../models/restaurant");
var Dinner       = require("../models/dinner");
var middleware      = require("../middleware");

//Dinner NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
        } else {
            res.render("dinners/new", {restaurant: restaurant});
        }
    });
});
//Dinner CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect("/restaurants"); 
        } else {
           Dinner.create(req.body.dinner, function(err, dinner){
               if(err){
                   console.log(err);
               } else {
                   restaurant.dinner.push(dinner);
                   restaurant.save(); 
                   res.redirect("/restaurants/" + restaurant._id); 
               }
           });
        }
    });
});

//Dinner EDIT ROUTE
router.get("/:dinner_id/edit", middleware.isLoggedIn, function(req, res){
    Dinner.findById(req.params.dinner_id, function(err, foundDinner){
       if(err){
           res.redirect("back");
       } else {
         res.render("dinners/edit", {restaurant_id: req.params.id, dinner: foundDinner});
       }
    });
 });
 
 //Dinner UPDATE
 router.put("/:dinner_id", middleware.isLoggedIn, function(req, res){
    Dinner.findByIdAndUpdate(req.params.dinner_id, req.body.dinner, function(err, updatedDinner){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/restaurants/" + req.params.id );
       }
    });
 });
 
 //Dinner DESTROY ROUTE
 router.delete("/:dinner_id", middleware.isLoggedIn, function(req, res){
     //findByIdAndRemove
     Dinner.findByIdAndRemove(req.params.dinner_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Dinner deleted");
            res.redirect("/restaurant/" + req.params.id);
        }
     });
 });

module.exports = router;