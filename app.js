const express= require('express');
const request=require('request')
const app=express();
//Middlewares
app.set("view engine", "ejs")
//Routing

app.get('/result', function(req, res) {
   // res.send(`this is the movie ${req.query.movies}`)

   const url=`http://www.omdbapi.com/?i=tt3896198&apikey=c2f14d4&s=${req.query.movies}`
   request(url, function(error, Response, body) {
        if(!error && Response.statusCode===200) {
            const data= JSON.parse(body)
            res.render("result", {dump:data})
        }
        else {
            res.send("Something went wrong")
        }
   })
})
app.get('/', function (req, res, data) {
    res.render("home")
})

app.listen(3000, ()=> {
    console.log("Server is started")
})