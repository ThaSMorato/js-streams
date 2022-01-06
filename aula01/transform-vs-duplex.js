import { Duplex, Transform } from "stream";

let count = 0;

const server = new Duplex({
  objectMode: true,
  encoding: "utf8",
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`my name is Thales-${count}`);
        return;
      }
      clearInterval(intervalContext);
      this.push(null);
    };
    setInterval(function () {
      everySecond(this);
    }, 1000);
  },
  write(chunk, encoding, callback) {
    console.log(`[Writable] saving`, chunk);
    callback();
  },
});

const transform = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    callback(null, chunk.toUpperCase());
  },
});

server.write("[duplex] Hello darkness my old friend!");

// server.push(`[duplex] this is everythiong \n`);

// server.on("data", (msg) => console.log(`[Readable] ${msg}`));
// server.pipe(process.stdout);

transform.write("[Transform] hello from write\n");
transform.push("[Transform] hello from push\n");

server.pipe(transform).pipe(server);
