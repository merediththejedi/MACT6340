import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));



app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});