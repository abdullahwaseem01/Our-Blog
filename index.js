const exp = require('express');
const app = exp();
const bp = require('body-parser');
const https = require('https');
const ejs = require('ejs');

app.use(bp.urlencoded({extended: true}));
app.use(exp.static('public'));
app.set('view engine', 'ejs');


const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});  
const db = admin.firestore();



app.get('/', function(req, res){
    res.render('home');
})

let blogsRef = db.collection('Blogs');

app.get('/blog', function(req, res){
    var posts = [];
    var eachPost = [];
    blogsRef.get().then((qureySnapshot) =>{
        qureySnapshot.forEach(document =>{
            // console.log(document.data().title);
            // console.log(document.data().description);
            // console.log(document.data().name);
            // console.log(document.data().posting);
            eachPost.push(document.data().title, document.data().description, document.data().posting )
            posts.push(eachPost);
        })

        // console.log('successfully read all documents');
    })
    
    res.render('blog');
})

app.get('/blogpost', (req, res)=>{
    res.redirect('blog')
})

app.get('/user', function(req, res){
    blogsRef.get().then((qureySnapshot) =>{
        qureySnapshot.forEach(document =>{
            // console.log(document.data().name);
        })
        // console.log('successfully author names');
    })

    res.render('users');
})

app.get('/addPost', function(req, res){
    res.render('addPost');
})

app.post('/addPost', function(req, res){
    const submission = {
        title: req.body.title,
        description: req.body.description,
        name: req.body.posterName,
        posting: req.body.posting 
    };
    // db.collection('Blogs').doc().set(submission);
    res.render('success');
})



app.listen(process.env.PORT || 3000, () =>{
    console.log('server is live!')
})


