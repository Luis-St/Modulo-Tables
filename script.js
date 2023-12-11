const table = document.getElementById("modulo-table");
const modulo = document.getElementById("modulo");
const type = document.getElementById("type");
const includeZero = document.getElementById("include-zero");
const includeSelf = document.getElementById("include-self");
const generate = document.getElementById("generate");

type.addEventListener("change", () => autoSetIncludeSelf());
includeZero.addEventListener("change", () => autoSetModulo());
generate.addEventListener("click", selectType);

function selectType() {
	let number = parseInt(modulo.value);
	let selected = type.value;
	
	if (selected === "addition") {
		generateTable(number, "+", (a, b) => a + b);
	} else if (selected === "subtraction") {
		generateTable(number, "-", function (a, b) {
			let result = a - b;
			if (result < 0) {
				result += number;
			}
			return result;
		});
	} else if (selected === "multiplication") {
		generateTable(number, "*", (a, b) => a * b);
	}
}

function generateTable(number, operator, func) {
	let zero = includeZero.checked ? 1 : 0;
	let self = includeSelf.checked ? 1 : 0;
	table.innerHTML = "";
	let header = document.createElement("tr");
	
	for (let i = 0; i < number + zero + self; i++) {
		let th = document.createElement("th");
		th.innerHTML = i === 0 ? operator : i - zero;
		header.appendChild(th);
	}
	table.appendChild(header);
	
	for (let i = (includeZero.checked ? 0 : 1); i < number + self; i++) {
		let tr = document.createElement("tr");
		for (let j = 0; j < number + zero + self; j++) {
			if (j === 0) {
				let th = document.createElement("th");
				th.innerHTML = i.toString();
				tr.appendChild(th);
			} else {
				let td = document.createElement("td");
				td.innerHTML = (func(i, j - zero) % number).toString();
				tr.appendChild(td);
			}
		}
		table.appendChild(tr);
	}
}

function autoSetIncludeSelf() {
	if (type.value === "multiplication" && includeSelf.checked) {
		includeSelf.checked = false;
	}
}

function autoSetModulo() {
	let number = parseInt(modulo.value);
	if (includeZero.checked && 2 >= number) {
		modulo.value = "3";
	}
}
