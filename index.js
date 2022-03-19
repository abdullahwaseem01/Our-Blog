const exp = require('express');
const app = exp();
const bp = require('body-parser');
const https = require('https');
app.use(bp.urlencoded({extended: true})); // necessary to parse html 
const request = require('request');
const res = require('express/lib/response');
const fs = require('fs');
const { title } = require('process');
const HTMLParser = require('node-html-parser');
const blog = HTMLParser.parse(__dirname + '/blog.html')


app.use(exp.static('public'));//loads html supporting files when sending responses to browser

app.use(bp.urlencoded({extended: true}));  

app.get('/', function(req, res){
    res.sendFile(__dirname + '/home.html');
})

app.get('/blog', function(req, res){

    fs.readFile(__dirname +'/database.json', 'utf8', (err, jsonString) => {
            const database = JSON.parse(jsonString)
            //console.log(database.title1[0]);
            const blogTitle = database.title1;
    })

    //console.log(blog);
    
    res.sendFile(__dirname + '/blog.html');
})

app.get('/user', function(req, res){
    res.sendFile(__dirname + '/users.html');
})

app.get('/addPost', function(req, res){
    res.sendFile(__dirname + '/addPost.html');
})

app.post('/addPost', function(req, res){
    console.log(req.body.title)
    console.log(req.body.description)
    console.log(req.body.posterName)
    console.log(req.body.posting)

    fs.readFile(__dirname +'/database.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const database = JSON.parse(jsonString)
            //console.log(database.title1)
    } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })

    res.redirect('/addPost')
})

app.get('/blogPost', function(req, res){
    res.sendFile(__dirname + '/blogPost.html');
})
app.get('/blogPost2', function(req, res){
    res.sendFile(__dirname + '/blogPost2.html');
})
app.get('/blogPost3', function(req, res){
    res.sendFile(__dirname + '/blogPost3.html');
})
app.get('/blogPost4', function(req, res){
    res.sendFile(__dirname + '/blogPost4.html');
})
app.get('/blogPost5', function(req, res){
    res.sendFile(__dirname + '/blogPost5.html');
})


app.listen(process.env.PORT || 3000, () =>{
    console.log('server is live!')
})
