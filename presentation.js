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



///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

	
	$('#sol').click(function() {

		// up();
		// down();
		// left();
		// right();
		let connus = [];
		let resultAuto = DFS(cases, 5, 1, 0, connus);

		console.log(resultAuto);

		// $("#debug").html('toto');
	})

	function up(cases) {
		// console.log('cases:', cases);		
		vPosition = getVposition(cases);

		if(vPosition.iV - 1 >= 0)  {
			let i = vPosition.iV - 1;
			let j = vPosition.jV;
			casesCopy = copyTableau(cases);
			permute3(i,j,vPosition);
			return casesCopy;			
		}
		else {
			// alert('impossible...');
			return null;
		}	
	}

	function down(cases) {
		vPosition = getVposition(cases);

		if(vPosition.iV + 1 < 4) {
			let i = vPosition.iV + 1;
			let j = vPosition.jV;
			casesCopy = copyTableau(cases);
			permute3(i,j,vPosition);	
			return casesCopy;			
		}
		else {
			// alert('impossible...');
			return null;
		}	
	}

	function left(cases) {
		vPosition = getVposition(cases);

		if(vPosition.jV - 1 >= 0) {
			let i = vPosition.iV;
			let j = vPosition.jV - 1;
			casesCopy = copyTableau(cases);
			permute3(i,j,vPosition);
			return casesCopy;				
		}
		else {
			// alert('impossible...');
			return null;
		}	
	}

	function right(cases) {
		vPosition = getVposition(cases);

		if(vPosition.jV + 1 < 4) {
			let i = vPosition.iV;
			let j = vPosition.jV + 1;
			casesCopy = copyTableau(cases);
			permute3(i,j,vPosition);
			return casesCopy;				
		}
		else {
			// alert('impossible...');
			return null;
		}	
	}

	function permute3(i,j,vPosition) {
			
			casesCopy[vPosition.iV][vPosition.jV] = casesCopy[i][j];
			casesCopy[i][j] = '';
			return casesCopy;
			// console.log('cases2:', cases2);
			// console.log('cases:', cases);
	}

	
	function DFS(e, max, p, nbreCoups, connus) {

		// ajouter e aux connus
		// console.log(connus);

		eTs = e.toString();
		// console.log(eTs);
		connus.push(eTs);
		console.log('nbconnus='+connus.length);
			
		if (p > max) {
			return false;
		}		

		if(checkVictory2(e)) {
			console.log('Taquin résolu automatiquement !!!');
			console.log(nbreCoups);
			$("#debug").html('-------------> Taquin résolu automatiquement !!!');
			return true;
		}

		let eUp = up(e);
		if(eUp) { // le mouvement est possible

			//console.log('UP');
			// si eUp n'est pas connu alors :
			// console.log(eUp);
			let uTs = eUp.toString();
			// console.log(uTs);
			// console.log(uTs.indexOf(connus));
			if(connus.indexOf(uTs) == -1) {
				nbreCoups++;
				let subResult = DFS(eUp, max, p+1, nbreCoups, connus);
				if (subResult) {
					console.log('U');
					return true;
				}
			}	
		}

		let eLeft = left(e);
		if(eLeft) {

			//console.log('LEFT');

			let lTs = eLeft.toString();
			if(connus.indexOf(lTs) == -1) {
				nbreCoups++;
				let subResult = DFS(eLeft, max, p+1, nbreCoups, connus);
				if (subResult) {
					console.log('L');
					return true;
				}
			}	
		}

		let eDown = down(e);
		if(eDown) {

			//console.log('DOWN');

			let dTs = eDown.toString();
			if(connus.indexOf(dTs) == -1) {
				nbreCoups++;
				let subResult = DFS(eDown, max, p+1, nbreCoups, connus);
				if (subResult) {
					console.log('D');
					return true;
				}
			}	
		}

		let eRight = right(e);
		if(eRight) {

			//console.log('RIGHT');

			let rTs = eRight.toString();
			if(connus.indexOf(rTs) == -1) {
				nbreCoups++;
				let subResult = DFS(eRight, max, p+1, nbreCoups, connus);
				if (subResult) {
					console.log('R');
					return true;
				}
			}	
		}

		return false;

	}



///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////




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

		// console.log(result);

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

	function checkVictory2(t) {
		for (let i=0; i <4; i++) {
			for (let j=0; j<4; j++) {
				if(casesReference[i][j] != t[i][j]) {
					return false;
				}				
			}
		}
		// $("#vic").html('---------> VICTORY (Taquin résolu automatiquement) !!!');
		// alert('VICTORY !!!');
		return true;				
	}
	
	$('#mel').click(function() {
		change2DarrayTo1Darray(cases);
		mix1Darray();
		// console.log(casesTemp);
		change1DarrayTo2Darray();
		console.log('cases:', cases);
		fillTable();
		casesTemp = [];
		casesCopy = copyTableau(cases);
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
			casesCopy = copyTableau(cases);
			permutableCases = [];
		}
		$('#resultTest').html('');
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
		$("#debug").html('-----DEBUG BAR-----'); 
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
		if(aa == bb) {
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

		// console.log(valClicked);

		// console.log(iClicked);
		// console.log(jClicked);

		let vPosition = getVposition(cases);
		let valV = cases[vPosition.iV][vPosition.jV];

		// console.log(valV);

		permute(iClicked,jClicked,vPosition,valClicked,valV);
		// console.log(vPosition);
		// // console.log(vPosition.iV);
		// result = permutable(iClicked,jClicked,vPosition);
		// console.log(result);
		
		
	})

})