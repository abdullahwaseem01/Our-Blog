const exp = require('express');
const app = exp();
const bp = require('body-parser');
const https = require('https');
const ejs = require('ejs');
const axios = require('axios').default;

app.use(bp.urlencoded({ extended: true }));
app.use(exp.static('public'));
app.set('view engine', 'ejs');


const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();



app.get('/', function (req, res) {
    res.render('home');
})

let blogsRef = db.collection('Blogs');

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

app.post('/blog', function(req, res){
    console.log(req.body.title);
    res.render('blogpost');
})

app.get('/blogpost', (req, res) => {
    res.render('blogpost');
})

app.get('/authors', function (req, res) {
    blogsRef.get().then((qureySnapshot) => {
        qureySnapshot.forEach(document => {
            // console.log(document.data().name);
        })
        // console.log('successfully author names');
    })

    res.render('authors');
})

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



app.listen(process.env.PORT || 3000, () => {
    console.log('server is live!')
})


