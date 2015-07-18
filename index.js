var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var user_count = 0;
var sequence_number = 0;

io.on('connection', function(socket){
  user_count++;
  sequence_number++;
  var user_id = 'User_ID_'+sequence_number;

  socket.emit('chat message', 'Welcome to chat room. Your User_ID is '+user_id+'. Have fun here.');
  socket.broadcast.emit('chat message', user_id+' just connected.');
  io.emit('user count', user_count);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    user_count--;
    io.emit('chat message', user_id+' disconneted.');
    io.emit('user count', user_count);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
