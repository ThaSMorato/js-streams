import { createWriteStream } from "fs";
import { Readable, Writable, Transform } from "stream";

const readable = Readable({
  read() {
    // for (let index = 0; index < 2; index++) {
    for (let index = 0; index < 1e4; index++) {
      const person = {
        id: index,
        name: `Thales-${index}`,
      };
      const data = JSON.stringify(person);
      this.push(data);
    }

    this.push(null);
  },
});

const mapFields = Transform({
  transform(chunk, encoding, callback) {
    const data = JSON.parse(chunk);
    const result = `${data.id}, ${data.name.toUpperCase()}\n`;
    callback(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return callback(null, chunk);
    }

    this.counter += 1;
    callback(null, "id, name\n".concat(chunk));
  },
});

const writable = Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());

    callback();
  },
});

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // .pipe(writable);
  .pipe(createWriteStream("my.csv"));

pipeline.on("end", () => console.log("cabo"));
