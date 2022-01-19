const url = "https://www.swapi.tech/api/people/?name=";
let input = document.getElementById("character");
let button = document.getElementById("btn");
let output = document.getElementById("text");

const onButtonPress = () => {
	let encName = encodeURI(input.value);
	fetch(url + encName)
		.then(res => res.json())
		.then(data => {
			console.log(data.result);

			output.value = data.result[0].description;
			output.value += data.result[0].properties.name;
			output.value += data.result[0].properties.height;
		})
		.catch((err) => console.log(err));
};

button.addEventListener("click", onButtonPress);
