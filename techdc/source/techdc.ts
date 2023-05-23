const resource = (async function () {
	return (await fetch("resources/techdc.json")).json();
})();
var selectStyle: HTMLSelectElement;
var selectColor: HTMLSelectElement;
const regex = {
	offset: {
		x: /(?<=\{techdc\d_\w* \[(?:-?\d*\.?\d* ){4})(.+?(?= \]))/g,
		y: /(?<=\{techdc\d_\w* \[(?:-?\d*\.?\d* ){4}.+? \] \[ (?:-?\d*\.?\d* ){3})(.+?(?= ))/g,
	},
	xVerts: /(?<=\( )(-?\d+)/g,
	valid: /^[a-zA-Z0-9#-\s]$|Shift|Backspace|Space/,
};

(async () => {
	resource.then((r) => {
		selectStyle = <HTMLSelectElement>document.getElementById("style_select");

		selectColor = <HTMLSelectElement>document.getElementById("color_select");
		populateSelect(
			selectStyle,
			r.styles.map((s: any) => s.name)
		);
		populateSelect(selectColor, r.colors);
		selectColor.selectedIndex = 5;
		selectStyle.selectedIndex = 3;

		document.getElementById("user_input")!.onkeydown = (e) => {
			console.log(e);
			if (e.key == "Enter") {
				go();
			} else if (e.key.match(regex.valid)) {
				return true;
			} else return false;
		};
	});
})();

function toggleToast() {
	const sb = <HTMLElement>document.getElementById("snackbar");
	sb.className = "show";
	setTimeout(() => {
		sb.className = sb.className.replace("show", "");
	}, 1900);
}

async function createBrush(input: string | null) {
	if (!input) {
		return null;
	}
	let currentStyle: any;
	let currentColor = selectColor.options[selectColor.selectedIndex].value;
	return resource.then((r) => {
		let group: string = '{"classname" "func_detail_illusionary"';
		currentStyle = r.styles[selectStyle.selectedIndex];
		let template: string = r.templates[currentStyle.template];
		template = template.replace(r.default.style, currentStyle.style);
		template = template.replace(r.default.color, currentColor);
		let multiplier = currentStyle.template.includes("thin") ? 0.75 : 1;
		// char loop
		for (let [index, char] of Array.from(input).entries()) {
			if (!Object.keys(r.chars).includes(char)) {
				continue;
			}
			// vertices
			let brush = template;
			brush = brush.replace(regex.xVerts, (m) => {
				return (
					parseInt(m) +
					currentStyle.char_size * multiplier * index
				).toString();
			});
			// offsets
			brush = brush.replace(
				regex.offset.x,
				(
					(r.chars[char].x - index * multiplier) *
					currentStyle.char_size
				).toString()
			);
			brush = brush.replace(
				regex.offset.y,
				(r.chars[char].y * currentStyle.char_size).toString()
			);
			group += brush;
		}
		return group + "}";
	});
}

async function go() {
	const outPreview = document.getElementById(
		"output_preview"
	) as HTMLTextAreaElement;
	const input = (<HTMLInputElement>document.getElementById("user_input")).value;
	const output = await createBrush(input);
	if (output) {
		outPreview.value = output;
		navigator.clipboard.writeText(output);
		toggleToast();
	}
}

function populateSelect(select: HTMLSelectElement, source: Array<string>) {
	source.forEach((e: string) => {
		let option = document.createElement("option");
		option.value = e;
		option.text = e;
		select.add(option);
	});
}
