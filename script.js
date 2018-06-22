



// Déclaration du tableau de données à 2 dimmensions
let cases = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, ''],
];

let casesReference = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, ''],
];

let casesTemp = [];
let permutableCases = [];
let casesCopy = [];
let nbreCoups = 0;



// $(".i2 .j2").html(cases[2][3]);
// console.log(cases[2][1]);


function fillTable() {
// Double boucle pour parcourir le tableau de données et remplir le html
	for (let i=0; i <4; i++) {
		for (let j=0; j<4; j++) {
			$(".i"+i + " .j"+j).html(cases[i][j]);
		}
	}
}

function getVposition(tab) {
	for (let i=0; i <4; i++) {
		for (let j=0; j<4; j++) {
			if(tab[i][j] == '') {
				let iV = i;
				let jV = j;
				return {"iV": iV, "jV": jV};
			}
		}
	}
}

function copyTableau(tableau) {
	let result = []
	for (let i=0; i<tableau.length; i++) {
		result[i] = []
		for (let j =0; j<tableau.length; j++) {
			result[i][j] = tableau[i][j];
		}
	}
	return result;
}

// function getVposition2() {
// 	for (let i=0; i <4; i++) {
// 		for (let j=0; j<4; j++) {
// 			if(casesCopy[i][j] == '') {
// 				let iV = i;
// 				let jV = j;
// 				return {"iV": iV, "jV": jV};
// 			}
// 		}
// 	}
// }
