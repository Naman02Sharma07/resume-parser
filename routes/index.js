var express = require('express');
var router = express.Router();
const passport = require("passport")

const loginModel = require("../Server/Models/Login");
const SignModel = require("../Server/Models/SignUp");
const ProjectModel = require("../Server/Models/Project");


const localStrategy = require("passport-local");
passport.use(new localStrategy(loginModel.authenticate()));

/* GET home page. */

router.post("/register",function(req,res,next){
  let userdata = new SignModel({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  })
  SignModel.register(userdata,req.body.password).then(function(){

      res.redirect("/login");
    }).catch(function(err){
      res.status(500).send("Error during registration: "+ err.message);
    });
  });


router.post("/login",passport.authenticate("local",{
  successRedirect:"profile",
  failureRedirect:"/login",
  failureFlash: true
}),function(req,res){})


router.post("/save", async function(req, res, next) {
  const { title, description, technologies, projects } = req.body;

  // Validate the projects array
  if (!Array.isArray(projects) || projects.length === 0) {
    return res.status(400).json({ message: "Projects array is required." });
  }

  // Validate and save each project
  
  try {
    const savedProjects = [];

    for (const project of projects) {
      if (!project.title || !project.description || !project.technologies) {
        return res.status(400).json({ message: "All fields are required for each project." });
      }

      let projectDetails = new ProjectModel({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
      });

      const savedProject = await projectDetails.save();
      savedProjects.push(savedProject);
    }

    // Send success response with the saved project data
    res.status(201).json({
      message: "Projects saved successfully!",
      projects: savedProjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving projects", error: error.message });
  }
});




router.get('/', (req, res) => {
    res.render('login');
  });

// router.get("/",(req,res) => {
//   res.send('<a href="/auth/google">Athenticate with google</a>')//for authorisation
// });

router.get('/signup', (req, res) => {
    res.render('index');
});


router.get('/profile',(req,res) => {
  res.render('profile');
})






module.exports = router;
