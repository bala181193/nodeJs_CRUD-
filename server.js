const express = require('express');
const homerouter=require('./router/home');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app = express()
const port = 3000

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//app.set('views', __dirname + '/views'); // general config

app.set('view engine','ejs')




//app.get('/', (req, res) => res.send('Hello World!'));
mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useUnifiedTopology:true});
const db=mongoose.connection;
db.on('error',()=>{console.log('error db connection')});
db.once('open',()=>{
    console.log('db connected');

});

app.use('/',homerouter);
app.listen(port, () => console.log('server is running'));
