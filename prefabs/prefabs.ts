// navigator.clipboard.writeText("awaga");

var img = document.createElement("img");

const maingrid = document.getElementById("maingrid");
const main = document.getElementById("main");

fetch("assets/compiled.json")
	.then((response) => response.json())
	.then((responseJson) => {
		gv(responseJson);
		console.log(responseJson);
	});

function gv(compiledOutput: Array<any>) {
	compiledOutput.forEach((o: any) => {
		const title = document.createElement("h3");
		title.innerText = o.folder_name;
		title.className = "folder_name";
		main?.appendChild(title);
		let awaga = document.createElement("div");
		awaga.id = "maingrid";

		o.files.forEach((f: any) => {
			const button = document.createElement("button");
			console.log(f);
			button.onclick = () => navigator.clipboard.writeText(f.content);
			// button.appendChild(document.createTextNode(`${o.folder}`));
			// button.appendChild(document.createElement("br"));
			button.appendChild(document.createTextNode(`${f.name}`));
			// document.body.appendChild(button);
			awaga?.appendChild(button);
		});

		main?.appendChild(awaga);
	});
}
