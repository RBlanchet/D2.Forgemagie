const bodyParser = require('body-parser');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});
const { Reader } = require('@rblanchet/d2-protocol');
const {PythonShell} = require("python-shell");

server.listen(8080);

const shell = new PythonShell('./lib/packet-interceptor/main.py', {mode: 'text'});
shell.on('message', data => {
  try {
    const message = Reader.readBuffer(Buffer.from(data, 'hex'));
    console.log(`[DOFUS] Message ${message.constructor.name} intercepté`);
    io.emit('message', {
      message: message.constructor.name,
      id: message.getMessageId(),
      content: message,
    })
  } catch (e) {}
});

module.exports = app;
