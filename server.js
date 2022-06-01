import express from "express";
import bcrypt from "bcrypt";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2q9NEJn2RrUpR8H89wHpeKnbYW4HPwvA",
  authDomain: "hypestreet-3b659.firebaseapp.com",
  projectId: "hypestreet-3b659",
  storageBucket: "hypestreet-3b659.appspot.com",
  messagingSenderId: "1019629277935",
  appId: "1:1019629277935:web:924ba762cf1cb18daf411a",
  measurementId: "G-QKJD4CGHCJ"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();



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
    else{
        //store data in firebase
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

