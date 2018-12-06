var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(request, response) {
	response.send('Alive');
});

io.on('connection', function(socket) {
	socket.on('chat.message', function (message) {
		io.emit('chat.message', message);
	})
})