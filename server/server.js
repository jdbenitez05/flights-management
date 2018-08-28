var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "flightsystem",
    port: 3306
});

var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');

connection.connect();
var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/', function (req, res) {
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) {
            res.send('error' + err);
            throw err;
        }

        res.send('The solution is: ' + rows[0].solution);
    });
});


app.get('/api/getFlights/', function (req, res) {
    connection.query('call getFlights', function (err, rows, fields) {
        let response;

        if (err) {
            // res.send('error' + err);
            // throw err;
            response = {
                data: null,
                message: 'Error: ' + err,
                status: false
            }
        } else {
            response = {
                data: rows,
                message: 'Ok',
                status: true
            }
        }

        res.send(response);
    });
});


app.get('/api/getClient/:doc', function (req, res) {
    // res.send('response with param: ' + req.params.doc);
    connection.query('call getClient("' + req.params.doc + '")', function (err, rows, fields) {
        let response;

        if (err) {
            // res.send('error' + err);
            // throw err;
            response = {
                data: null,
                message: 'Error: ' + err,
                status: false
            }
        } else {
            response = {
                data: rows,
                message: 'Ok',
                status: true
            }
        }

        res.send(response);
    });
});

app.post('/api/postReservation/', function (req, res) {

    let idcliente = req.body.idcliente;
    let form = req.body;

    if (idcliente == null && idcliente < 1 && idcliente == undefined) {
        //Registrar el cliente
        var query = 'call insertClient("' + form.nombres + '", "' + form.apellidos + '", "' + form.documento + '", "' + form.fechanacimiento + '", "' + form.correo + '", "' + form.telefono + '")';
        connection.query(query, function (err, rows, fields) {
            if (err) {
                res.send('error' + err);
                throw err;
            }

            idcliente = rows[0][0].last_id;

            var query2 = 'call insertReserva('+idcliente+', '+form.idvuelo+', '+form.asientos+')';
            connection.query(query2, function(err, rows, fields){
                if (err) {
                    res.send('error' + err);
                    throw err;
                }

                res.send('true');
            }); 
        });
    }
    
    // res.send(form);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});