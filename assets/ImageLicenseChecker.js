//run this script via node to get the license status of images contained in the letterAssets JSON file
var letterAssets = require("../assets/letterAssets.json");
var list = letterAssets.letters;
var i = 0;
console.log("Getting license statuses...");
while (i < list.length) {
	var name = list[i].name;
	var license = list[i].license;
	console.log(`Image '${name}' has a ${license} license`);
	i = i + 1
}
console.log("Done.")