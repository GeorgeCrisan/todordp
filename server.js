const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
let port = 8332;

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/api',(req,res)=>{
        res.send({works: 'Ready to develop'});
});

app.use(express.static(path.join(__dirname + '/client/build')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('*', (req,res)=>{
       res.sendFile(path.join(__dirname + '/client/build/index.html'),(error)=>{
             if(error){
                 res.status(500).send(error);
             }
       });
});


app.listen(process.env.PORT || port,()=>{
    console.log(`server runing`);
});