var express               = require("express");
    methodOverride        = require("method-override"); 
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    flash                 = require("connect-flash"), 
    passport              = require("passport"),
    User                  = require("./models/user"), 
    RestaurantMenu        = require("./models/restaurant"), 
    Appetizer             = require("./models/appetizer"),
    Dessert               = require("./models/dessert"),
    Lunch                 = require("./models/lunch"),
    Dinner                = require("./models/dinner"),
    Breakfast             = require("./models/breakfast"),
    Drink                 = require("./models/drink"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

var indexRoutes = require("./routes/index");
var restaurantRoutes = require("./routes/restaurants"); 
var breakfastRoutes = require("./routes/breakfasts");
var lunchRoutes = require("./routes/lunchs");
var dinnerRoutes = require("./routes/dinners");
var dessertRoutes = require("./routes/desserts");
var appetizerRoutes = require("./routes/appetizers");
var drinkRoutes = require("./routes/drinks");

mongoose.connect("mongodb://localhost/restaurant_app", {useNewUrlParser: true});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 
app.use(methodOverride("_method")); 
app.use(flash()); 

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Scorpio",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
}); 

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 


const port = 3000
app.listen(port, () => console.log(`server started at http://localhost:${port}/`));

app.use(indexRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/restaurants/:id/breakfasts",breakfastRoutes);
app.use("/restaurants/:id/lunchs",lunchRoutes);
app.use("/restaurants/:id/dinners",dinnerRoutes);
app.use("/restaurants/:id/desserts",dessertRoutes);
app.use("/restaurants/:id/appetizers",appetizerRoutes);
app.use("/restaurants/:id/drinks",drinkRoutes);




// //store newaddress
// app.post("/newaddress", function(req, res){
//      var newadd = req.body.newadd;
//      //calls function to compare and then update 
//     res.redirect("/index");
// });


// //gets the address then redirects to /index
// //show all of the restaurants based on the address in order from closest to furthest 
// app.get("/index", function(req, res){
//     //Get all campgrounds from DB
//     restaurant.find({}).sort({address: {$meta: newadd}, posts: "asc"}).exe(function(err, allRestaurants){
//         if(err){
//             console.log(err);
//         } else {
//             //then sort by address and send to index to display all
//             res.render("index", {index: allRestaurants}); 
//         }
//     });
// });
