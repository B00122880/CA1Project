var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');



var app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
   cookie: { secure: true, maxAge: 60000 }
}))
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
app.use('/test', testRouter);


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


app.get('/checkIfTimeLeft', function (req, res) {

 
  var timeLeft = req.session.cookie.maxAge / 1000;
  console.log(timeLeft);
  
  if(timeLeft < 1){
      
      res.send('expired');
      
  } else {
      
      res.send('ok');      
  }
  
  
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


  //var sqlselect = "SELECT * FROM customerorders  order by id;"
 var sqlselect = "select * from customerorders WHERE ORDERDATE  between '"+fromdate+ "' and '"+ todate+"'";


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



app.post('/getcustomerOrders', function (req, res) {

var customerid  = req.body.customerid;

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


  var sqlselect = "SELECT * FROM customerorders  WHERE ORDERby = '"+customerid+"' order by id;"

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

   var sqlselect = "select * from customerorders WHERE ORDERSTATUS = 'GETTING READY'";

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
  
  req.session.username = username;
  req.session.validSession = true;

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
	var deladdress = req.body.address;

 

  
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
//  var sql = "INSERT INTO `test`.`customerorders` (`orderby`, `items`) VALUES ('"+orderby+"', '"+items+"');";
  var sql = "INSERT INTO `test`.`customerorders` (`orderby`, `items`, `deliveryaddress`) VALUES ('"+orderby+"', '"+items+"','"+deladdress+"');";
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



app.get('/getProducts', function (req, res) {
   
   
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
  con.query("SELECT * from products", function (err, result, fields) {
    if (err) throw err;
   
    
    var output = '';
    for(var i=0; i < result.length; i++){
        

       output = output + `
       
       <img src="`+result[i].picturepath+`" style="height:100px;width:100px">
       
       <div class="ui-field-contain">
            <label for="select-native-2">`+result[i].productname+`</label>
           
        <select id="`+result[i].productname+`_qty" name="select-native-2" id="select-native-2" data-mini="true">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
         <br>   
         Price: `+result[i].cost+`   
        
        <br>
        <button data-icon="plus" id="addtocart" class="ui-btn ui-btn-b ui-btn-inline"  onclick="addToCart('`+result[i].productname+`_qty', `+result[i].cost+`)"> Add To Cart </button>
        <button id="deleteProduct" class="ui-btn ui-btn-b ui-btn-inline" onclick="deleteProduct('`+result[i].productname+`_qty')">Delete product </button>
        </div>    
        `;

    }
    

    
    res.send(output);
    
    
    
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
