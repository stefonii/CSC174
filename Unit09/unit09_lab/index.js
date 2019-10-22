var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('A User Connected');
    io.emit('chat message', '---' + socket.client.id + ' Just Joined the Room!!!');
    socket.on('disconnect', function () {
        console.log('User Disconnected');
        io.emit('chat message', '---' + socket.client.id + ' Just Left the Room!!!');
    })
  socket.on('chat message', function(msg){
    io.emit('chat message', '[' + socket.client.id + ']: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
