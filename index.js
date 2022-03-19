const exp = require('express');
const app = exp();
const bp = require('body-parser');
const https = require('https');
app.use(bp.urlencoded({extended: true})); // necessary to parse html 
const request = require('request');
const res = require('express/lib/response');
app.use(exp.static('public'));//loads html supporting files when sending responses to browser

app.use(bp.urlencoded({extended: true}));  

app.get('/', function(req, res){
    res.sendFile(__dirname + '/home.html');
})

app.get('/blog', function(req, res){
    
    res.sendFile(__dirname + '/blog.html');
})

app.get('/user', function(req, res){
    res.sendFile(__dirname + '/users.html');
})

app.get('/addPost', function(req, res){
    res.sendFile(__dirname + '/addPost.html');
})

app.listen(process.env.PORT || 3000, () =>{
    console.log('server is live!')
})

app.post('/addPost', function(req, res){
    console.log(req.body.title)
    console.log(req.body.description)
    console.log(req.body.posterName)
    console.log(req.body.posting)
    res.redirect('/addPost')
})

app.get('/user', function(req, res){
    res.sendFile(__dirname + '/users.html');
})