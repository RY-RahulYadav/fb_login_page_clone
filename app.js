const express = require("express")
const path= require("path")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const port=80;
const app=express()



app.set("view engine" ,'ejs')
app.set("views" , path.join( __dirname , "views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/fb', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

const fbschema=mongoose.Schema({
    emailandno:String,
    password:String
})
const fbitem=mongoose.model("fbitem" ,fbschema)



app.get("/",(req,res)=>{
    res.render("fb")

})

app.post("/",(req,res)=>{
   
         let info= req.body.text
         console.log(info)
         let pass=req.body.password
         console.log(pass)

         fbitem.findOne({emailandno:info , password:pass}, (err, foundlist)=>{
            if(!foundlist){
                
                res.send("<h1>Incorrect user name and password<h1/>")
               
            }
            else{
                console.log(foundlist)
               res.send("<h1>you are successfully login into your account<h1/>")
            }
         })
})
app.listen(port ,()=>{
         console.log("server starts now")
})