const express = require('express');
const app = express();
const path = require('path');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const hbs = require('hbs');


require("./db/conn");
const Register = require("./models/plasmasignup");
const Request = require("./models/plsamarequest");
const Donate = require("./models/plasmadonate");
const Contactus = require("./models/contactus");

const port = process.env.PORT || 3000 ;

const static_path =path.join(__dirname , "../public");


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));
// app.set("view engine","hbs");

const JWT_SECRET = 'rj2311@2601';


app.get("/",(req,res)=>{
    res.render("index");
});


app.post("/index.html",async (req,res)=>{
    try {
            
            
            const contactus = new Contactus ({

                username : req.body.username,
                email : req.body.email,
                phonenumber : req.body.phonenumber,
                address : req.body.address,
                state : req.body.state,
                city : req.body.city,
                zip : req.body.zip,
                symptoms : req.body.coronasym,
                message : req.body.message

            });
            console.log(contactus);

            // Bcryptjs USED  



            const contact = await contactus.save();
            
            res.redirect("/index.html");

        

    } catch (error) {
        console.log(error.message);
    }
       
});

app.get("/plasma_request_donate.html",(req,res)=>{
    res.render("plasma_request_donate");
});

app.post("/plasma_request_donate.html" , async (req,res) =>{
   
    try {
            
        const pass = req.body.password;
        const cpass = req.body.confirmpassword;

        
        if(pass == cpass){
            
            const plasmaregister = new  Register({

                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
                phonenumber : req.body.phonenumber

            });

            // Bcryptjs USED  



            const register = await plasmaregister.save();
            res.redirect("/plasma_request_donate.html");

        }
        else{
            res.send("Passwords are not matching....");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/login.html" , async (req,res)=>{
    try {
        const email = req.body.email1;
        const password = req.body.password1;

        const usermail = await Register.findOne({email:email});
        
        const isMatch = await bcrypt.compare(password , usermail.password);
        
        console.log(isMatch);

        if(isMatch)
        {
            res.redirect("/plasma_request_donate.html");
        }
        else{
            res.send("Invalid login details");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/plsama.html" , async (req,res) =>{
   
    try {
            
            
            const plasmarequest = new  Request({

                username : req.body.username,
                gender : req.body.gender,
                age : req.body.age,
                blood : req.body.blood,
                phonenumber : req.body.phonenumber,
                date : req.body.date,
                state : req.body.state,
                city : req.body.city,
                hospital : req.body.hospital


            });
            console.log(plasmarequest);

            // Bcryptjs USED  



            const register = await plasmarequest.save();
            
            res.redirect("/plasma.html");

        

    } catch (error) {
        console.log(error.message);
    }
});

app.get("/plasmarequestapi",async (req,res)=>{
    
        const users =await Request.find({});
        
         res.send(users);
});
app.post("/plasmadonation.html",async (req,res)=>{
    try {
            
            
            const plasmadonate = new  Donate({

                username : req.body.username,
                gender : req.body.gender,
                age : req.body.age,
                blood : req.body.blood,
                phonenumber : req.body.phonenumber,
                positivedate : req.body.positivedate,
                negativedate : req.body.negativedate,
                state : req.body.state,
                city : req.body.city,

            });
            console.log(plasmadonate);

            // Bcryptjs USED  



            const donate = await plasmadonate.save();
            
            res.redirect("/plasma.html");

        

    } catch (error) {
        console.log(error.message);
    }
       
});
app.get("/plasmadonateapi",async (req,res)=>{
    
        const users =await Donate.find({});
        
         res.send(users);
});

app.get("/forgotpassword.html",(req,res)=>{
    res.redirect("/resetpassword.html")
});

app.post("/forgotpassword.html",async (req,res)=>{
    
    try {
        const email = req.body.email;
        const usermail = await Register.findOne({email:email});
        if(email == usermail.email)
        {
            const secret = JWT_SECRET + usermail.password;
            const payload = 
                {
                email : usermail.email
                }
                const token = jwt.sign(payload , secret , {expiresIn : '2m'});
                const link = `http://localhost:3000/resetpassword/${email}/${token}`;
                console.log(link);
                res.send("<h1>Password link has been sent to your registered email....</h1>");

        }
    } catch (error) {
        res.send(error);
    }
});

app.get("/resetpassword/:email/:token" , async(req,res)=>{

    const {email , token} = req.params;
    
    
    // check if this email exist in databse
    const usermail = Register.findOne({email:email});
    console.log(usermail.email);
    if(email !== usermail.email){

        res.send("Invalid Login email...");
        return
    }
        const secret = JWT_SECRET + usermail.password;
        try {
            const payload = jwt.verify(token , secret);
            res.redirect("/resetpassword.html");
        } catch (error) {
            console.log(error.message);
            res.send(error).message;
        }
    
});

// app.post("/login_signup.html" , async (req,res) =>{
//     res.redirect("/login_signup.html");
// })

app.post("/resetpassword/:email/:token" , async(req,res)=>{
    
    const {email , token} = req.params;

    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    // check if this email exist in databse
    const usermail = await Register.findOne({email:email});
    console.log(usermail.email);
    // if(email !== usermail.email){

    //     res.send("Invalid Login email...");
    //     return
    // }

    const secret = JWT_SECRET + usermail.password;
    try {
        
        const payload = jwt.verify(token , secret);

        //validate both passwords

        if(password == confirmpassword){
            // we can simply find the user with the payload and emial and finally update with  new password

            usermail.password = password;
            // const register = await usermail.password.save();
            console.log(usermail);
            // res.redirect("/login_signup.html")

        }
        else{
            res.send("Passwords are not matched....");
        }

    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
});


/// FETCH THE DATA FROM PLSAMREQUEST COLLECTION...
// app.get("/plsamrequests.html" , async(req,res)=>{
//     try {
//         const users = await Request.find({});
//         res.send(users);
//     } catch (error) {
//         console.log(error.message);
//     }
// })



app.listen(port , ()=>{
    console.log("Connected");
});
