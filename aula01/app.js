import http from "http";
import { createReadStream, readFileSync } from "fs";

http
  .createServer((req, res) => {
    // const file = readFileSync('big.file');
    // res.write(file);
    // res.end();

    createReadStream("big.file").pipe(res);
  })
  .listen(3000, () => console.log("running at 3000"));

//curl localhost:3000 -o output.txt
