var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");


const app = express();
const port = 3000;


app.use(express.static('../library'))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, '/')));

app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.sendFile('project4.html', { root: __dirname })
});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project4'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

app.post('/project4.html', function (req, res) {

    var sql = "INSERT INTO `contact`(`name`, `surname`, `reason`, `other`) VALUES ('"+ req.body.firstname +"', '"+ req.body.lastname +"' , '"+ req.body.reason +"' ,'"+ req.body.additional +"' )"

    connection.query(sql, function (err){
        if (err) throw err;
        res.redirect("http://localhost:3000/project4.html");
    })
})

app.listen(port, ()=>console.info(`App listening on port ${port}`));

module.exports = connection;










