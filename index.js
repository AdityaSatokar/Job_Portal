import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import jobController from "./src/controller/controller.js";
import { uploadResume, uploadLogo} from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { auth } from "./src/middlewares/authorization.middleware.js";

//CONFIGURATIONS
const app = express();
const controller = new jobController();
app.use(expressEjsLayouts);
app.use(express.urlencoded({extended:true}));
// app.use(express.static("public"));
app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine","ejs");
app.set("views",path.join(path.resolve(),"src","view"))
app.use(cookieParser());
app.use(
    session({
        secret: "thisisasecretkey",
        saveUninitialized: true,
        cookie: {maxAge:24*60*60*1000},
        resave: false,
    })
)

//ROUTES
app.get("/", controller.renderHome)
app.get("/jobs", controller.renderJobs)
app.get("/jobs/:id/details", controller.renderDetails)
app.get("/jobs/:id/applicants", auth, controller.renderApplicants)
app.get("/jobs/:id/details/applicationForm", controller.applicationForm)
app.get("/register", controller.registrationForm)
app.get("/login", controller.getLogin)
app.get("/postJob", auth, controller.getPostJob)
app.get("/logout", controller.logout)
app.get("/jobs/:id/details/updateJob", auth, controller.getUpdateJob)
app.get("/jobs/:id/details/delete", auth, controller.deleteJob)

app.post("/jobs/:id/details/applicationForm", uploadResume.single("resume"), controller.apply)
app.post("/register", controller.register)
app.post("/login", controller.login)
app.post("/postJob", auth, uploadLogo.single("logo"), controller.postJob)
app.post("/jobs/:id/details/updateJob", auth, uploadLogo.single("logo"), controller.updateJob)

//PORT CONFIGURATION
const port = 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
