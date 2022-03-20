const exp = require('express');
const app = exp();
const bp = require('body-parser');
const https = require('https');
const blogs = require('./config')
app.use(bp.urlencoded({extended: true}));
app.use(exp.static('public'));
app.use(bp.urlencoded({extended: true}));  

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/home.html');
})

app.get('/blog', function(req, res){
    res.sendFile(__dirname + '/views/blog.html');
})

app.get('/user', function(req, res){
    res.sendFile(__dirname + '/views/users.html');
})

app.get('/addPost', function(req, res){
    res.sendFile(__dirname + '/views/addPost.html');
})

app.post('/addPost', function(req, res){
    console.log(req.body.title)
    console.log(req.body.description)
    console.log(req.body.posterName)
    console.log(req.body.posting)
    res.sendFile(__dirname + '/views/success.html');
})

app.get('/blogPost', function(req, res){
    res.sendFile(__dirname + '/views/blogPost.html');
})
app.get('/blogPost2', function(req, res){
    res.sendFile(__dirname + '/views/blogPost2.html');
})
app.get('/blogPost3', function(req, res){
    res.sendFile(__dirname + '/views/blogPost3.html');
})
app.get('/blogPost4', function(req, res){
    res.sendFile(__dirname + '/views/blogPost4.html');
})
app.get('/blogPost5', function(req, res){
    res.sendFile(__dirname + '/views/blogPost5.html');
})


app.listen(process.env.PORT || 3000, () =>{
    console.log('server is live!')
})
