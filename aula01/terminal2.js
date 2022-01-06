require("net")
  .createServer((socket) => socket.pipe(process.stdout))
  .listen(1338);
