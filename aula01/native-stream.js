process.stdin
  .pipe(process.stdout)
  .on("data", (msg) => console.log(msg.toString()))
  .on("error", (msg) => console.log(msg))
  .on("end", (_) => console.log("end"))
  .on("close", (_) => console.log("close"));
