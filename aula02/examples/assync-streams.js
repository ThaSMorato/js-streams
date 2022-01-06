import { setTimeout } from "timers/promises";
import { pipeline } from "stream/promises";

async function* myCustomReadable() {
  yield Buffer.from("this is my");
  await setTimeout(100);
  yield Buffer.from("custom readable");
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, "_");
  }
}

async function* myCustomDuplex(stream) {
  let bytesRead = 0;
  const wholeString = [];
  for await (const chunk of stream) {
    console.log("[duplex writable]", chunk);
    bytesRead += chunk.length;
    wholeString.push(chunk);
  }

  yield `whole string ${wholeString.join()}`;
  yield `bytes read ${bytesRead}`;
}

async function* myCustomWritable(stream) {
  // stream.setEncoding("utf8");
  for await (const chunk of stream) {
    // console.log({ writable: chunk.toString() });
    console.log({ writable: chunk });
  }
}

try {
  const controller = new AbortController();
  await pipeline(myCustomReadable, myCustomTransform, myCustomDuplex, myCustomWritable, {
    signal: controller.signal,
  });
  console.log("cabo");
} catch (e) {
  console.error(e);
}
