//run this script via node to get the license status of images contained in the letterAssets JSON file. Will not provide info on other files
var letterAssets = require("../assets/letterAssets.json");
var list = letterAssets.letters;
var i = 0;
console.log("Getting license statuses...");
while (i < list.length) {
	if (list[i].image != null) {
		var name = list[i].name;
		var license = list[i].license;
		console.log(`Image '${name}' has a ${license} license`);
	}
	i = i + 1
}
console.log("Done.")