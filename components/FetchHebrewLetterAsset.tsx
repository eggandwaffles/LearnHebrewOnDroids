var letterAssets = require("../assets/letterAssets.json");
 var letterData = letterAssets.letters;
 export function FetchLetterAsset (name, fetchProperty) {
	if (letterData.some(letter => letter.name === name)) {
	var targetLetter = letterData.find(letter => letter.name === name)
	if (fetchProperty === "image") {
		return targetLetter.image;
	}
 } else {
		return '../assets/nullImage.png'
	}
 };
 //Thanks to MDN for a refresher on arrays and array methods