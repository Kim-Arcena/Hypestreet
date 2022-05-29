import express from "express";
import bcrypt from "bcrypt";

//init server
const app = express();

//middlewares
app.use(express.static("public"));

//enable form sharing
app.use(express.json());

//route
//home route
app.get('/', (req, res) => {
    res.sendFile("index.html", { root: "public" })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})