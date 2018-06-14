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

	function permute(iClicked,jClicked,vPosition,valClicked,valV) {

		result = permutable(iClicked,jClicked,vPosition);

		console.log(result);

		if(result === true) {
			let iTemp = iClicked;
			let jTemp = jClicked;
										console.log(iTemp);
										console.log(jTemp);
			iClicked = vPosition.iV;
			jClicked = vPosition.jV;
										console.log(iClicked);
										console.log(jClicked);
			vPosition.iV = iTemp;
			vPosition.jV = jTemp;
										console.log(vPosition.iV);
										console.log(vPosition.jV);

			cases[iClicked][jClicked] = valClicked;
										console.log(cases[iClicked][jClicked]);

			cases[vPosition.iV][vPosition.jV] = valV
										console.log(cases[vPosition.iV][vPosition.jV]);

			fillTable();
		}

		else {
			alert('Impossible de déplacer cette case !!!')
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