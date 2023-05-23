"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resource = (function () {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield fetch("resources/techdc.json")).json();
    });
})();
var selectStyle;
var selectColor;
const regex = {
    offset: {
        x: /(?<=\{techdc\d_\w* \[(?:-?\d*\.?\d* ){4})(.+?(?= \]))/g,
        y: /(?<=\{techdc\d_\w* \[(?:-?\d*\.?\d* ){4}.+? \] \[ (?:-?\d*\.?\d* ){3})(.+?(?= ))/g,
    },
    xVerts: /(?<=\( )(-?\d+)/g,
    valid: /^[a-zA-Z0-9#-\s]$|Shift|Backspace|Space/,
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    resource.then((r) => {
        selectStyle = document.getElementById("style_select");
        selectColor = document.getElementById("color_select");
        populateSelect(selectStyle, r.styles.map((s) => s.name));
        populateSelect(selectColor, r.colors);
        selectColor.selectedIndex = 5;
        selectStyle.selectedIndex = 3;
        document.getElementById("user_input").onkeydown = (e) => {
            console.log(e);
            if (e.key == "Enter") {
                go();
            }
            else if (e.key.match(regex.valid)) {
                return true;
            }
            else
                return false;
        };
    });
}))();
function toggleToast() {
    const sb = document.getElementById("snackbar");
    sb.className = "show";
    setTimeout(() => {
        sb.className = sb.className.replace("show", "");
    }, 1900);
}
function createBrush(input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input) {
            return null;
        }
        let currentStyle;
        let currentColor = selectColor.options[selectColor.selectedIndex].value;
        return resource.then((r) => {
            let group = '{"classname" "func_detail_illusionary"';
            currentStyle = r.styles[selectStyle.selectedIndex];
            let template = r.templates[currentStyle.template];
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
                    return (parseInt(m) +
                        currentStyle.char_size * multiplier * index).toString();
                });
                // offsets
                brush = brush.replace(regex.offset.x, ((r.chars[char].x - index * multiplier) *
                    currentStyle.char_size).toString());
                brush = brush.replace(regex.offset.y, (r.chars[char].y * currentStyle.char_size).toString());
                group += brush;
            }
            return group + "}";
        });
    });
}
function go() {
    return __awaiter(this, void 0, void 0, function* () {
        const outPreview = document.getElementById("output_preview");
        const input = document.getElementById("user_input").value;
        const output = yield createBrush(input);
        if (output) {
            outPreview.value = output;
            navigator.clipboard.writeText(output);
            toggleToast();
        }
    });
}
function populateSelect(select, source) {
    source.forEach((e) => {
        let option = document.createElement("option");
        option.value = e;
        option.text = e;
        select.add(option);
    });
}
