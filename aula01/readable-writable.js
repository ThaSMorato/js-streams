import { Readable, Writable } from "stream";

const readable = Readable({
  read() {
    this.push("Hello World");
    this.push("Hello World2");
    this.push("Hello World3");

    this.push(null);
  },
});

const writable = Writable({
  write(chunk, encoding, callback) {
    console.log("msg", chunk.toString());

    callback();
  },
});

readable.pipe(writable);
