import express from 'express';
import dotenv from 'dotenv';
import * as utils from './utils/utils.js';
import * as db from './utils/database.js';

dotenv.config();

const data = ['Project 1', 'Project 2', 'Project 3'];
let projects = [];
let projects2 = [];

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
    await db.connect().then(async () => {
        projects = await db.getAllProjects();
        console.log(projects);
        projects.forEach((proj) => {proj.img_url = proj.img_url.replace("/public", "")});
        let feat = getRandomInt(projects.length);
        res.render("index.ejs", {projectArray: projects, featProj: feat});
    })
});

app.get("/projects", (req, res) => {
        res.render("projects.ejs", {projectArray: projects});
});

app.get("/project/:id", (req, res) => {
    let id = req.params.id;
    if (id > data.length) {
        throw new Error("No project with that ID")
    }
    res.render("project.ejs", {projectArray: data, which: id});

});


app.listen(port, () => {
    console.log(`App running @ http://localhost:${port}`);
})


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }