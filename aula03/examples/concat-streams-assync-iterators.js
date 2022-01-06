import axios from "axios";
import { Writable, PassThrough } from "stream";
import { pipeline } from "stream/promises";

const API1 = "http://localhost:3000";
const API2 = "http://localhost:4000";

const requests = await Promise.all([
  axios({
    method: "GET",
    url: API1,
    responseType: "stream",
  }),
  axios({
    method: "GET",
    url: API2,
    responseType: "stream",
  }),
]);

const results = requests.map(({ data }) => data);

//writable stream
async function* output(stream) {
  for await (const chunk of stream) {
    const name = chunk.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log({ [name.toLowerCase()]: chunk });
  }
}

//pass through stream
async function* merge(streams) {
  for (const readable of streams) {
    readable.setEncoding("utf8");
    for await (const chunk of readable) {
      // console.log({ chunk });
      for (const line of chunk.trim().split("\n")) {
        yield line;
      }
    }
  }
}

// const streams = merge(results).pipe(output);

await pipeline(merge(results), output);
