import {
  readJSON,
  writeJSON,
  removeFile,
} from "https://deno.land/x/flat@0.0.11/mod.ts";

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0]; // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename);

const values = Object.values(json); // convert property values into an array
const filteredValues = values.map((val) => ({
  appid: val.appid,
  name: val.name,
  owners: val.owners,
  average_forever: val.average_forever,
  average_2weeks: val.average_2weeks,
  median_forever: val.median_forever,
  median_2weeks: val.median_2weeks,
  ccu: val.ccu,
}));

// Step 3. Write a new JSON file with our filtered data
const newFilename = `steam-postprocessed.json`; // name of a new file to be saved
await writeJSON(newFilename, filteredValues); // create a new JSON file with just the Bitcoin price

// Optionally delete the original file
await removeFile("./steam.json"); // equivalent to removeFile('btc-price.json')
