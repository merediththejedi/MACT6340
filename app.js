import express from 'express';
import dotenv from 'dotenv';
import * as utils from './utils/utils.js';
import * as db from './utils/database.js';

dotenv.config();

const data = ['Project 1', 'Project 2', 'Project 3'];
let projects = ['Project 1', 'Project 2', 'Project 3'];

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

db.connect().then(() => {
    console.log('Database connected successfully.');
}).catch(err => {
    console.error('Database connection failed:', err);
});


app.get("/", async (req, res) => {
    await db
    .connect()
    .then(async () => {
        projects = await db.getAllProjects();
        console.log(projects);
        res.render("index.ejs");
    })
   //.catch(next);
});

app.get("/about", (req, res) => {
    res.render("about.ejs", {title: "About"});
});

app.get("/featured", (req, res) => {
    res.render("featured.ejs", { title: "Featured" });
});


app.get("/projects", (req, res) => {
        res.render("projects.ejs", {projectArray: projects});
});

app.get("/projects/:id", (req, res) => {
    let id = req.params.id;
    if (id > data.length) {
        throw new Error("Oopsies! Try again")
    }
    res.render("projects.ejs", {projectArray: data, which: id});

});


app.listen(port, () => {
    console.log(`App running @ http://localhost:${port}`);
})


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  //projects = await db.getAllProjects();
  //console.log(projects);
  //projects.forEach((proj) => {proj.img_url = proj.img_url.replace("/public", "")});
  //let feat = getRandomInt(projects.length);
  //res.render("index.ejs", {projectArray: projects, featProj: feat});