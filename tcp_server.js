var net = require('net');

var HOST = '0.0.0.0';
var PORT = 9000;
var PORT_SPRING = 8080;
net.createServer(function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    sock.setKeepAlive(true);
    sock.setTimeout(2000,function(){
        sock.end("HTTP/1.1 200 OK\r\nConnection: close\r\n\r\n");
    });
var client = new net.Socket();
client.connect(PORT_SPRING, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
  console.log(data);
		  sock.write(data);
});
    sock.on('data', function(data) {
  if(data[0] == 0x2a)
  	return;
//  data.replace('text/plain','application/json')
//  da<F12>ta.replace(/\*HELLO\*/g, '');
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        client.write(data);
    });
    sock.on('close', function(data){
    	console.log('SOck Closed');
    	sock.end()
    	sock.destroy();
    })
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
