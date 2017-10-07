var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();

app.set('view engine', 'ejs');



// middleware

// app.use('/assets',function(req,res,next){
//   console.log(req.url);
//   next();
// });

app.use('/',function(req,res,next){
  console.log('check login stuff');
  next();
});


app.use('/assets',express.static('assets'));

app.get('/', function (req, res) {
    // res.sendFile(`${__dirname}/index.html`);
        res.render('index');
});
app.get('/contact', function (req, res) {
      res.render('contact',{qs:req.query});
});
app.post('/contact',urlencodedParser,function(req,res){
  console.log(req.body);
  res.render('contact-success',{data:req.body});
})
app.get('/profile/:id',function (req, res) {
    // res.send(`You have requested to see profile with is ${req.params.id}`);
    var data = {
      name:'Arunesh Saxena',
      homeTown:'Sitapur',
    hobbies:['eating','running','biking']}
    res.render('profile',{userId:req.params.id,data:data});
});
app.listen(3000);
