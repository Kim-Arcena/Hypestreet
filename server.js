import express from "express";
import bcrypt from "bcrypt";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";
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


//signup route
app.get('/signup', (req, res) => {
    res.sendFile("signup.html", { root: "public" })
})

//seller route
app.get("/seller", (req, res) => {
    res.sendFile('seller.html', {root: "public"});
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
    else if(!Number(number) || number.length < 10){
        res.json({ 'alert' : 'Invalid Number'});
    }
    else if(!tac){
        res.json({ 'alert' : 'You must agree to the terms and conditions'});
    }
    else{
        //store data in firebase
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(user => {
            //check if it exists in the db
            if(user.exists()){
                return res.json({'alert': 'Email already exists'});
            }
            else{
                //else encrypt password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        //store data
                        req.body.password = hash;
                        req.body.seller = false;
                        
                        
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })   
                        })
                    })
                })
            }
        })
    }   
})

app.get('/login', (req, res) => {
    res.sendFile("login.html", { root: "public" })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;
    if(!email.length || !password.length){
        res.json( { 'alert': 'Email and Password are required' });
    }
    const users = collection(db, "users");

    getDoc(doc(users, email)).then(user => {
        if(!user.exists()){
            return res.json({ 'alert': 'Email does not exist' });
        }
        else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                }
                else{
                    return res.json({ 'alert': 'Invalid Password' });
                }
            })
        }
    })
})

//localhost:3000/register
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})


