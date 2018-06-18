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
		checkVictory();
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

	function checkVictory() {
		for (let i=0; i <4; i++) {
			for (let j=0; j<4; j++) {
				if(casesReference[i][j] != cases[i][j]) {
					return false;
				}				
			}
		}
		$("#vic").html('------------------------------------------------> VICTORY !!!');
		// alert('VICTORY !!!');
		return true;				
	}
	
	$('#mel').click(function() {
		change2DarrayTo1Darray(cases);
		mix1Darray();
		console.log(casesTemp);
		change1DarrayTo2Darray();
		console.log(cases);
		fillTable();
		casesTemp = [];
		$('#resultTest').html('');
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
			casesTemp = [];
			permutableCases = [];
			$('#resultTest').html('');
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
		$("#vic").html('');
		$('#resultTest').html('');
		casesTemp = [];
		permutableCases = [];
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

	function parityTableau() {

		change2DarrayTo1Darray();
		
		let l = casesTemp.length;
		let compteur = 0;
		for (i=0;i<l-1;i++) {  
    		j_max=i;
    		c_max=casesTemp[i];    		
    		for (j=i+1;j<l;j++) { 
        		if (casesTemp[j]<c_max) {
            		j_max=j;
            		c_max=casesTemp[j];             		         		            		
        		}
    		}
    	casesTemp[j_max]=casesTemp[i];
    		if(j_max != i) {
    			compteur = compteur +1;
    		}
    	casesTemp[i]=c_max;
		}
		// console.log(compteur);		
		// console.log(casesTemp);
		return compteur;
	}

	function parityV() {
		let vPosition = getVposition();	
		// console.log(vPosition.iV);
		// console.log(vPosition.jV);	
		let parity = (3 - vPosition.iV) + (3 - vPosition.jV);
		// console.log(parity);
		return parity;
	}

	function isEven(n) {
   		return n % 2 == 0;
	}

	function isOdd(n) {
  		 return Math.abs(n % 2) == 1;
	}


	$('#test').click(function() {

		// parityV();
		// parityTableau();
		casesTemp = [];

		let a = parityV();
		let b = parityTableau();
		console.log(a);
		console.log(b);
		let aa = isOdd(a);
		let bb = isOdd(b);
		console.log(aa);
		console.log(bb);
		if(aa == true && bb == true || aa == false && bb == false) {
			$('#resultTest').html('-----------> OK, on peut résoudre ce Taquin !');
		}
		else {
			$('#resultTest').html('-----------> IMPOSSIBLE de résoudre ce Taquin !!!');
		}
		// let casesTemp = [];
		// let permutableCases = [];
	})


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