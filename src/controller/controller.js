import { jobs } from "../model/job.model.js";
import Job from "../model/job.model.js";
import Applicant from "../model/applicants.model.js";
import User from "../model/user.model.js";

export default class jobController{

    renderHome(req,res){
        res.render('home',{user:req.session.userEmail});
    }

    renderJobs(req,res){
        res.render('jobs',{jobs:jobs,user:req.session.userEmail});
    }

    renderDetails(req,res){
        let jobId = req.params.id;
        let noOfApplicants = Applicant.getNumberOfApplicants(jobId);
        let job = Job.getJobById(jobId);
        res.render("details",{job:job,noOfApplicants:noOfApplicants,user:req.session.userEmail});
    }

    applicationForm(req,res){
        const jobId = req.params.id;
        res.render("applicationForm",{jobId:jobId, user:req.session.userEmail});
    }

    apply(req,res){
        let jobId = req.params.id;
        const {name, email, mobile} = req.body;
        const resume = "/resources/resumes/" + req.file.filename;
        Applicant.createApplicant(jobId,name,email,mobile,resume);
        res.redirect("/jobs/"+jobId+"/details");
    }

    renderApplicants(req,res){
        const jobId = req.params.id;
        let applicants = Applicant.getApplicantsByJobId(jobId);
        res.render("applicants",{applicants:applicants,user:req.session.userEmail});
    }

    register(req,res){
        const {name,email,password} = req.body;
        User.createUser(name,email,password);
        res.redirect("/login");
    }

    registrationForm(req,res){
        res.render("registrationForm",{user:req.session.userEmail});
    }

    login(req,res){
        const {email, password} = req.body;
        if(User.checkUser(email,password))
        {
            req.session.userEmail = email;
            res.redirect("/jobs",);
        }
        else{
            console.log("login failed!!!");
            res.status(401).render("error",{err:"User Not Found",user:req.session.userEmail});
        }
    }

    getLogin(req,res){
        res.render("login",{user:req.session.userEmail});
    }

    getPostJob(req,res){
        res.render("postJob",{user:req.session.userEmail});
    }

    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log("error destroying session", err);
            }
            else{
                res.redirect("/");
            }
        })
    }

    postJob(req,res){
        const {category, designation, location, name, salary, positions, skills, lastDate} = req.body;
        const logo = "/resources/logos/" + req.file.filename;

        Job.createJob(name,category,designation,location,salary,positions,skills,lastDate,logo);
        res.redirect("/jobs");
    }

    getUpdateJob(req,res){
        const jobId = req.params.id;
        res.render("updateJob",{id:jobId,user:req.session.userEmail})
    }

    updateJob(req,res){
        const {category, designation, location, name, salary, positions, skills, lastDate} = req.body;
        const imgURL = "/resources/logos/" + req.file.filename;
        const jobId = req.params.id;
        console.log(category, designation, location, name, salary, positions, skills, lastDate);
        console.log(imgURL);
        console.log(jobId);
        Job.updateJob(jobId,name,category,designation,location,salary,positions,skills,lastDate,imgURL)
        res.redirect("/jobs");
    }

    deleteJob(req,res){
        const jobId = req.params.id;
        Job.deleteJobById(jobId);
        res.redirect("/jobs")
    }
}