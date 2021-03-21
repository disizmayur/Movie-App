const express= require('express');
const request=require('request')
const dotenv=require('dotenv')
dotenv.config()
const app=express();
//Middlewares
app.set("view engine", "ejs")
app.use('/public', express.static('public'))
//Routing

app.get('/result', function(req, res) {
   // res.send(`this is the movie ${req.query.movies}`)

   const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movies}`
   request(url, function(error, Response, body) {
        if(!error && Response.statusCode===200) {
            const data= JSON.parse(body)
            res.render("result", {dump:data, search: req.query.movies})
        }
        else {
            res.send("Something went wrong")
        }
   })
})
app.get('/', function (req, res, data) {
    res.render("home")
})
app.get('/about', function (req, res, data) {
    res.render("about")
})
app.get('/result/:id', function (req, res){
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
   request(url, function(error, Response, body) {
        if(!error && Response.statusCode===200) {
            const data= JSON.parse(body)
            res.render("detail", {data:data})
        }
        else {
            res.send("Something went wrong")
        }
})
})
app.get("*",(req,res)=>{
    // res.send('Go Back! Illegal request')
    res.render('notfound')

})
app.listen(3000, ()=> {
    console.log("Server is started")
})