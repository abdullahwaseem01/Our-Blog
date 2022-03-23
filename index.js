const exp = require('express');
const app = exp();
const bp = require('body-parser');
const https = require('https');

app.use(bp.urlencoded({extended: true}));
app.use(exp.static('public'));
app.set('view engine', 'ejs');


const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});  
const db = admin.firestore();



app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/home.html');
})

let blogsRef = db.collection('Blogs');

app.get('/blog', function(req, res){
    blogsRef.get().then((qureySnapshot) =>{
        qureySnapshot.forEach(document =>{
            console.log(document.data().title);
            console.log(document.data().description);
            console.log(document.data().name);
            console.log(document.data().posting);
        })

        console.log('successfully read all documents');
    })
    
    res.sendFile(__dirname + '/views/blog.html');
})

app.get('/user', function(req, res){
    blogsRef.get().then((qureySnapshot) =>{
        qureySnapshot.forEach(document =>{
            console.log(document.data().name);
        })
        console.log('successfully author names');
    })

    res.sendFile(__dirname + '/views/users.html');
})

app.get('/addPost', function(req, res){
    res.sendFile(__dirname + '/views/addPost.html');
})

app.post('/addPost', function(req, res){
    const submission = {
        title: req.body.title,
        description: req.body.description,
        name: req.body.posterName,
        posting: req.body.posting 
    };
    db.collection('Blogs').doc().set(submission);
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


