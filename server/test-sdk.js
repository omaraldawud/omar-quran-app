import { QuranClient } from "@quranjs/api";

const client = new QuranClient({
  clientId: "a",
  clientSecret: "b",
});

console.log("AUDIO MODULE:", Object.keys(client.audio));
console.log("CHAPTERS MODULE:", Object.keys(client.chapters));
console.log("VERSES MODULE:", Object.keys(client.verses));
