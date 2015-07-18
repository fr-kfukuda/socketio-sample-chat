var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.emit('chat message', 'Welcome to chat room. Have fun here.');
  socket.broadcast.emit('chat message', 'A user newly joined.');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    io.emit('chat message', 'A user disconneted.');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
