var locationAllSpan = [

];

function highlightText() {

	var currPosition = getSelectionPosition();

	
	var isOk = true;
	for (let i = 0; i < locationAllSpan.length; i++) {
		if (
				(currPosition.start > locationAllSpan[i].start && currPosition.start < locationAllSpan[i].end) 
				|| (currPosition.end > locationAllSpan[i].start && currPosition.end < locationAllSpan[i].end )
				|| (currPosition.end > locationAllSpan[i].end && currPosition.start < locationAllSpan[i].start )
			) {
				isOk = false;
			}
		}

	if (isOk) {
		// Ajout de l'objet dans le tableau
		locationAllSpan.push(currPosition);
		
		//on crée la balise span
		createSpan(currPosition)

		console.log(locationAllSpan);
		


	}else{
			console.log('Déja dans le surlignement');
	}
}









function createSpan(currPosition) {
		var selection = window.getSelection().getRangeAt(0);
		var selectedText = selection.extractContents();
		console.log(selectedText);
		
    var span = document.createElement("span");
    span.style.backgroundColor = currPosition.colorSpan;
    span.setAttribute("PosStart", currPosition.start);
    span.setAttribute("PosEnd", currPosition.end);
    span.appendChild(selectedText);
		selection.insertNode(span);
		
}

function getSelectionPosition() {
		var range = window.getSelection().getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(document.getElementById("annotation"));
		preSelectionRange.setEnd(range.startContainer, range.startOffset);		
    var start = preSelectionRange.toString().length;
		var end = start + range.toString().length;
		var colorSpan = getRandomColor();
    
    var spanLocation = {
        start,
				end,
				colorSpan
		}

    return spanLocation;
};





$(document).ready(function () {
	verifTable(locationAllSpan);
  })

function verifTable(table) {

	if (table.length != 0 ){
		for (let i = 0; i < table.length; i++) {
			//createSpan(table[i])			
		}
	}
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  function removeMarks() {
    $(".Mark").each(function () {
        $(this).contents().unwrap();
    });
}