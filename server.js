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
    if(name.length < 3){
        res.json({'alert': 'Fullname must be at least 3 characters'});
    }
    else if(!email.length){
        res.json({ 'alert' : 'Email is required'});
    }
    else if(password.length < 8){
        res.json({ 'alert' : 'Password must be at least 8 characters'});
    }
    else if(Number(number) || number.length < 10){
        res.json({ 'alert' : 'Invalid Number'});
    }
    else if(!tac.checked){
        res.json({ 'alert' : 'You must agree to the terms and conditions'});
    }
})

//signup route
app.get('/signup', (req, res) => {
    res.sendFile("signup.html", { root: "public" })
})

//localhost:3000/register
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

