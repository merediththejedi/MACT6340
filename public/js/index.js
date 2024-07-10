import express from 'express';
import dotenv from 'dotenv';
import * as utils from './utils/utils.js';
import { connect, getAllProjects } from './utils/database.js'; // Updated import

dotenv.config();

const app = express();
const port = 3000; // Changed port number
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

// Connect to the database when the server starts
connect().then(() => {
    console.log('Database connected successfully.');
}).catch(err => {
    console.error('Database connection failed:', err);
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/featured", (req, res) => {
    res.render("featured");
});

app.get("/projects", (req, res) => {
    res.render("projects");
});

app.listen(port, () => {
    console.log(`App running @ http://localhost:${port}`);
});
