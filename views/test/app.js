var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(express.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/getManagerData', function (req, res) {


  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });



// hold the data that we going to send back.
var output = '';


  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT orderby, items FROM customerorders;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);


    // looping over the records
    for(var i=0; i< result.length; i++){
        output = output + result[i].orderby + '---' + result[i].items + '<br>';
    }

     // return the output variable
    res.send(output);
  });
});

});


app.post('/getManagerDataByDate', function (req, res) {

  var fromdate  = req.param("fromdate");
  var todate  = req.param("todate");


  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });


  var sqlselect = "SELECT * FROM customerorders  order by id;"
 // var sqlselect = "select * from customerorders WHERE ORDERDATE  between '"+fromdate+ "' and '"+ todate+"')";
 //   var sqlselect = "select * from customerorders WHERE ORDERDATE  between '2021-01-01 00:00:00' and '2021-12-31 23:59:00';" ;

  console.log(sqlselect);
  con.connect(function(err) {
  if (err) throw err;
  con.query(sqlselect, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

});



app.post('/getDriverData', function (req, res) {


  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });

   var sqlselect = "select * from customerorders WHERE ORDERSTATUS = 'PENDING'";

  console.log(sqlselect);
  con.connect(function(err) {
  if (err) throw err;
  con.query(sqlselect, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

});

app.post('/checkTheLogin', function (req, res) {

   // catching the variables
  var username = req.body.username;
  var pass = req.body.password;

  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });



  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users WHERE username = '"+username+"' AND PASSWORD = '"+pass+"' LIMIT 1;", function (err, result, fields) {
    if (result.length > 0){
      console.log(result);
      res.send(result[0].acctype);
    } else {
      res.send('NONE');
    }

    // return the account type back
  });
});




});


app.post('/putInDatabase', function (req, res) {

  // catching the variables
  var username = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  var address = req.body.address;
  var acctype = req.body.acctype;

  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');


 // set up a connection
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });


  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO `test`.`users` (`username`, `email`, `password`, `address`, `acctype`) VALUES ('"+username+"', '"+email+"', '"+pass+"', '"+address+"', '"+acctype+"');";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
  res.send('Data went to the database');


})



app.post('/completeCheckout', function (req, res) {

  // catching the variables
  var orderby = req.body.orderby;
  var items = req.body.items;


  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');


 // set up a connection
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });


  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO `test`.`customerorders` (`orderby`, `items`) VALUES ('"+orderby+"', '"+items+"');";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
  res.send('Data went to the database');


})


app.post('/updateorderstatus', function (req, res) {

  // catching the variables
  var get_id  = req.body.orderid;
  var newstatus =  req.body.newstatus;

  var mysql = require('mysql');
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });


   con.connect(function(err) {
    if (err) throw err;

 var sql = "update customerorders set orderstatus = '"+newstatus+"' WHERE id =  '"+get_id+"'";
  console.log(sql);

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
	console.log("status updated ");
	res.send("Order Status Updated");
  });
});
});




app.post('/getProductsData', function (req, res) {


  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });

   var sqlselect = "select * from products ORDER by product_id"; 

  console.log(sqlselect);
  con.connect(function(err) {
  if (err) throw err;
  con.query(sqlselect, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

});














// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
