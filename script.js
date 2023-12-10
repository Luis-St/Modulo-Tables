const table = document.getElementById("modulo-table")
document.getElementById("generate").addEventListener("click", generate);

function generate() {
	let number = parseInt(document.getElementById("modulo").value);
	let type = document.getElementById("type").value;
	
	if (type === "addition") {
		generateTable(number, "+", (a, b) => a + b);
	} else if (type === "subtraction") {
		generateTable(number, "-", function (a, b) {
			let result = a - b;
			if (result < 0) {
				result += number;
			}
			return result;
		});
	} else if (type === "multiplication") {
		generateTable(number, "*", (a, b) => a * b);
	}
}

function generateTable(number, operator, func) {
	table.innerHTML = "";
	let header = document.createElement("tr");
	
	for (let i = 0; i < number; i++) {
		let th = document.createElement("th");
		th.innerHTML = i === 0 ? operator : i;
		header.appendChild(th);
	}
	table.appendChild(header);
	
	for (let i = 1; i < number; i++) {
		let tr = document.createElement("tr");
		for (let j = 0; j < number; j++) {
			if (j === 0) {
				let th = document.createElement("th");
				th.innerHTML = i.toString();
				tr.appendChild(th);
			} else {
				let td = document.createElement("td");
				td.innerHTML = (func(i, j) % number).toString();
				tr.appendChild(td);
			}
		}
		table.appendChild(tr);
	}
	document.getElementById("main").appendChild(table);
}
