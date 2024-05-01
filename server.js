import express, { urlencoded } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import routes from "./src/routes/userRoutes.js";
import { connectMongodb } from "./src/config/mongodbConfig.js";
import session from "express-session";
import flash from 'connect-flash';
import bodyParser from "body-parser";
const app = express();

//... ejs views setup
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressEjsLayouts);
app.use(express.static("public"));

//..........setup expresion ...
app.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },

}));

app.use(flash());

//.....home page routes
app.get("/", (req,res)=>{
   
    res.render("home")
});

//... set router for all

app.use("/", routes);

//....routes for error page
app.use((req, res, next) => {
    res.status(404).render("error"); // Render your 404 page here
});


app.listen(3200, ()=>{
    console.log("server is listening on port 3200");
    connectMongodb();
})