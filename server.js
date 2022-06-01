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


app.post('/signup', (req, res) => {
    const { name, email, password, number, tac } = req.body;

    //validation

})

//signup route
app.get('/signup', (req, res) => {
    res.sendFile("signup.html", { root: "public" })
})

//localhost:3000/register
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

