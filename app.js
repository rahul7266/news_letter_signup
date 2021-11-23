const express=require("express");

const request=require("request");
const bp=require("body-parser");
const app=express();
const https=require("https");
const { response } = require("express");

app.use(bp.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/signupu.html");
});

app.post("/",function(req,res){
   var firstName= req.body.fname;
   var lastName= req.body.lname;
   var email=req.body.email;
   //console.log(firstName,lastName,email);
   var data={
      members: [
         {
            email_address:email,
            status:"subscribed",
            merge_fields:{
               FNAME:firstName,
               LNAME:lastName
            }
         }
      ]
   };
const jsonData=JSON.stringify(data);

const url="https://us20.api.mailchimp.com/3.0/lists/e3fa91ca1c";


const options={
   method: "POST",
   auth:"Rahul:b901f400237dcc8521c5002a98df1709-us20"
}
const request=https.request(url,options,function(response){

   if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
   }else{
      res.sendFile(__dirname+"/failure.html");
   }
   
   response.on("data",function(data){
      console.log(JSON.parse(data));
   });

});

 request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
   res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
console.log("it's working");
});

// api Key
// b901f400237dcc8521c5002a98df1709-us20
// list id 
// e3fa91ca1c