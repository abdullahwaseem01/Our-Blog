const exp = require('express');
const app = exp();
const bp = require('body-parser');
const https = require('https');
const ejs = require('ejs');
const underscore = require('underscore');
const axios = require('axios').default;

//Express configuration 
app.use(bp.urlencoded({ extended: true }));
app.use(exp.static('public'));
app.set('view engine', 'ejs');
app.listen(process.env.PORT || 3000, () => {
    console.log('server is live!')
})

//Firebase configuration 
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const { PassThrough } = require('stream');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();
let blogsRef = db.collection('Blogs');


//Home Route 
app.get('/', function (req, res) {
    res.render('home');
})

//Blog Route 
app.get('/blog', function (req, res) {
    var posts = [];
    var eachPost = [];
    blogsRef.get().then((qureySnapshot) => {
        qureySnapshot.forEach(document => {
            eachPost = [];
            eachPost.push(document.data().title);
            eachPost.push(document.data().description);
            eachPost.push(document.data().name); 
            posts.push(eachPost);
        })
        res.render('blog', {
            posts: posts
        });
    })

})

//Blog Post Route 
app.get('/blogpost/:title', (req, res) => {
    console.log(req.params.title);
    res.render('blogpost');
})

//Authors Route
app.get('/authors', function (req, res) {
    var allAuthors = [];
    blogsRef.get().then((qureySnapshot) => {
        qureySnapshot.forEach(document => {
            allAuthors.push(document.data().name);
        })
        var authors = underscore.uniq(allAuthors); 
        res.render('authors', {
            authors:authors
        });
    })

})

//Add Post Route 
app.get('/addpost', function (req, res) {
    res.render('addpost');
})
app.post('/addpost', function (req, res) {
    const submission = {
        title: req.body.title,
        description: req.body.description,
        name: req.body.posterName,
        posting: req.body.posting
    };
    db.collection('Blogs').doc().set(submission);
    res.render('success');
})



