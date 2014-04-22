var connect = require('connect');

var players = [];
var units = [];

var x=connect.createServer(
    connect.static(__dirname)
).listen(8090,function(object){

console.log(object);

});



