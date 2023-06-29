const express = require('express');
const hbs = require('hbs');
const user = require('./models/userModel');
const path = require('path');
require('C:/Users/arpan/OneDrive/Desktop/backend/Ecom-main/Ecom-main/server/db/connection.js')

const app = express();
const router = express.Router();

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "./template/views");
console.log(templatePath);
const partialPath = path.join(__dirname, "");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.use(express.static(staticPath));
app.set("views", templatePath);
hbs.registerPartials(partialPath);


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/productdetail', (req, res) => {
    res.render('productdetail');
})

app.get('/product', (req, res) => {
    res.render('products');
})

app.get('/cart', (req, res) => {
    res.render('cart');
})


app.get('/account', (req, res) => {
    // res.send("this is about page");
    res.render('account')
})

app.post('/register', async (req, res) => {
    try {
        if (req.body.password == req.body.confirmpassword) {
            const username = req.body.username;
            const newUser = new user({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                mobilenumber: req.body.mobilenumber,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            });
            const registeredUser = await newUser.save();
            res.status(201).render('index');
        }
        else
        {
            res.send('Passwords Not Matching');
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(error);
    }
});

app.post('/login', async(req,res)=>{
    try{
        const username=req.body.username;
        const mobile=req.body.username;
        const password=req.body.password;
        const userNamegiven = await user.findOne({ username: username });
        const firstname=userNamegiven.firstname;
        console.log(userNamegiven);
        console.log("Entered password is "+password);
        console.log("user password in database is "+userNamegiven.password);
        if (password === userNamegiven.password) {

            res.status(201).send('successLogin');
        }
        else {
            // console.log(userName.password);
            res.status(400).send('faile login');
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send(err);
    }
})

app.listen(7000, (req, res) => {
    try {
        console.log("Server running successfully on server 7000");
    }
    catch (err) {
        console.log(err);
    }
})