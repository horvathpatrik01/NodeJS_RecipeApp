const express= require('express');
var app = express();

app.use(express.static('static'));

var server=app.listen(3000,()=>{
    console.log("On :3000");
});