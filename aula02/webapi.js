import { read } from "fs";
import http from "http";
import { Readable } from "stream";

function api1(req, res) {
  // res.writeHead('test01\n')
  // res.writeHead('test02\n')
  // res.writeHead('test03\n')
  // req.pipe(res)

  let count = 0;
  const maxItens = 99;

  const readable = new Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItens) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `Thales-${count}` }) + "\n");
          return;
        }

        clearInterval(intervalContext);
        this.push(null);
      };

      setInterval(function () {
        everySecond(this);
      }, 100);
    },
  });

  readable.pipe(res);
}

function api2(req, res) {
  let count = 0;
  const maxItens = 99;

  const readable = new Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItens) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `Zezin-${count}` }) + "\n");
          return;
        }

        clearInterval(intervalContext);
        this.push(null);
      };

      setInterval(function () {
        everySecond(this);
      }, 100);
    },
  });

  readable.pipe(res);
}

http.createServer(api1).listen(3000, () => console.log(3000));
http.createServer(api2).listen(4000, () => console.log(4000));
