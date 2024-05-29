var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');
const { text } = require('body-parser');


var app = express();
var server = http.Server(app);
var port = 500;

app.set("port",port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "page/index.html")));

//Routing

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname, "page/index.html"))
})


app.post("/send_email", function(req,res){
    var from = req.body.from;
    var to = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;

   var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'prasadsunilmahajan22@gmail.com',
        pass: 'lejx qlud djwt itos'
    }
   });

   var mailoptions = {
    from: from,
    to: to,
    subject: subject,
    text: message
   }

   transporter.sendMail(mailoptions,function(error,info){
    if(error){
        console.log(error)
    }else{
        console.log("Email Send:" + info.response)
    }
      response.redirect("/")

   })
})

server.listen(port, function(){
    console.log("Starting Server on port: " + port)
})