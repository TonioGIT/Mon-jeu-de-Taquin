$(document).ready(function () {


	fillTable();



	function permutable(iClicked,jClicked,vPosition) {

		if(iClicked == vPosition.iV) {
			return (jClicked+1 == vPosition.jV || jClicked-1 == vPosition.jV)
		}
		else if(jClicked == vPosition.jV) {			
			return (iClicked+1 == vPosition.iV || iClicked-1 == vPosition.iV) 
		}		
		else {			
			return false;
		}
	}

	function permutable2(i,j,vPosition) {

		if(i == vPosition.iV) {
			return (j+1 == vPosition.jV || j-1 == vPosition.jV)
		}
		else if(j == vPosition.jV) {			
			return (i+1 == vPosition.iV || i-1 == vPosition.iV) 
		}		
		else {			
			return false;
		}
	}

	function stockPermutableCases(vPosition) {
		for (let i=0; i <4; i++) {
			for (let j=0; j<4; j++) {
				result = permutable2(i, j, vPosition)
				if (result == true) {
					permutableCases.push([i, j]);
				}
			}
		}
		console.log(result);
		console.log(permutableCases);
	}

	function randomSelectInPermutableCases() {
		let randomItem = permutableCases[Math.floor(Math.random()*permutableCases.length)];
		return randomItem;
	}

	function permute(iClicked,jClicked,vPosition,valClicked,valV) {

		result = permutable(iClicked,jClicked,vPosition);

		console.log(result);

		if(result === true) {

			cases[iClicked][jClicked] = valV;									
			cases[vPosition.iV][vPosition.jV] = valClicked;
			fillTable();
		}
		else {
			alert('Impossible de déplacer cette case !!!')
		}
	}

	function permute2(i,j,vPosition) {		

			cases[vPosition.iV][vPosition.jV] = cases[i][j];
			cases[i][j] = '';
			fillTable();					
	}

	function getRandomNumber() {
		let rn = Math.floor((Math.random() * 1000) + 1);
		return rn;
	}

	$('#mel').click(function() {		
		change2DarrayTo1Darray(cases);
		mix1Darray();
		console.log(casesTemp);
		change1DarrayTo2Darray();
		console.log(cases);
		fillTable();		
		casesTemp = [];		
	})

	$('#mel2').click(function() {
		x = getRandomNumber();

		for(let i=0; i < x; i++) {
		console.log(x);
		let vPosition = getVposition();
		stockPermutableCases(vPosition);
		r = randomSelectInPermutableCases();
		console.log(r);
		permute2(r[0],r[1],vPosition);
		permutableCases = [];
		}
	})

	$('#res').click(function() {		
		cases = [
		  [1, 2, 3, 4],
		  [5, 6, 7, 8],
		  [9, 10, 11, 12],
		  [13, 14, 15, ''],
		];		
		fillTable();
	})

	function change2DarrayTo1Darray() {
		for (let i=0; i <4; i++) {
			for (let j=0; j<4; j++) {
				casesTemp.push(cases[i][j]);
			}
		}			
	}

	function mix1Darray() {
		for (let i = casesTemp.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = casesTemp[i];
        casesTemp[i] = casesTemp[j];
        casesTemp[j] = temp;
		}		
	}

	function change1DarrayTo2Darray() {		
		for (let i=0; i <4; i++) {
			for (let j=0; j<4; j++) {
				let k = 4*i +j;					
				cases[i][j] = casesTemp[k];
			}
		}
	}



	$('td').click(function() {

		let iClicked = parseInt($(this).attr("i"));
		let jClicked = parseInt($(this).attr("j"));
		let valClicked = cases[iClicked][jClicked];

		console.log(valClicked);

		// console.log(iClicked);
		// console.log(jClicked);

		let vPosition = getVposition();
		let valV = cases[vPosition.iV][vPosition.jV];

		console.log(valV);

		permute(iClicked,jClicked,vPosition,valClicked,valV);
		// console.log(vPosition);
		// // console.log(vPosition.iV);
		// result = permutable(iClicked,jClicked,vPosition);
		// console.log(result);
		
	})

})