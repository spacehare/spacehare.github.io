// navigator.clipboard.writeText("awaga");
const maingrid = document.getElementById("maingrid");
const main = document.getElementById("main");
const grids = document.getElementsByClassName(
	"gridlines"
) as HTMLCollectionOf<HTMLElement>;

const COMPILED = grab("assets/compiled.json");
const TEMPLATE = { style: "band", color: "teal" };
const REGEXTEMPLATE = {
	style: new RegExp(TEMPLATE.style, "g"),
	color: new RegExp(TEMPLATE.color, "g"),
};

// const selectStyle = <HTMLSelectElement>document.getElementById("style select");
// const selectColor = <HTMLSelectElement>document.getElementById("color select");
// const COMPILED = grab("assets/compiled.json");
// WAD.then((r) => {
// 	console.log("R", r);
// 	populateSelect(styleSelect, r.trim.style);
// 	populateSelect(colorSelect, r.trim.color);
// });

// fetch("assets/compiled.json")
// 	.then((response) => response.json())
// 	.then((responseJson) => {
// 		compiled = responseJson;
// 		console.log("RJ", compiled);
// 	});

function toggleGrids() {
	Array.from(grids).forEach((e) => {
		e.style.visibility = e.style.visibility == "hidden" ? "visible" : "hidden";
	});
}

fetch("assets/wad.json")
	.then((response) => response.json())
	.then((wad) => {
		const selectStyle = <HTMLSelectElement>(
			document.getElementById("style_select")
		);

		const selectColor = <HTMLSelectElement>(
			document.getElementById("color_select")
		);
		populateSelect(selectStyle, wad.trim.style);
		populateSelect(selectColor, wad.trim.color);
		selectColor.selectedIndex = 5;

		// IDK WHY THIS HAS TO HERE
		// const allButtons = document
		// 	.getElementById("all buttons")!
		// 	.getElementsByTagName("button");
		// Array.from(allButtons!).forEach((element) => {
		// 	console.log(element);
		// 	element.onclick = () => copyObject(element.id);
		// 	element.innerText = element.id;
		// });
	});

async function grab(path: string) {
	return await fetch(path)
		.then((response) => response.json())
		.then((responseJson: string) => {
			return responseJson;
		});
}

function populateSelect(select: HTMLSelectElement, source: Array<string>) {
	source.forEach((e: string) => {
		let option = document.createElement("option");
		option.value = e;
		option.text = e;
		select.add(option);
	});
}

function copyObject(desired: string) {
	const selectStyle = <HTMLSelectElement>(
		document.getElementById("style_select")
	);
	const selectColor = <HTMLSelectElement>(
		document.getElementById("color_select")
	);
	let output: string;
	COMPILED.then((r: any) => {
		output = r[desired].object;
		var currentColor = selectColor.options[selectColor.selectedIndex].value;
		var currentStyle = selectStyle.options[selectStyle.selectedIndex].value;
		if (currentStyle !== TEMPLATE.style) {
			output = output.replace(REGEXTEMPLATE.style, currentStyle);
		}
		if (currentColor !== TEMPLATE.color) {
			output = output.replace(REGEXTEMPLATE.color, currentColor);
		}
		navigator.clipboard.writeText(output);
	});
}
