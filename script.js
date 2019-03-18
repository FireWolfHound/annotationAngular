var locationAllSpan = JSON.parse(localStorage.getItem('table')) || []

splitingText()


function highlightText() {

	var currPosition = getSelectionPosition();


	var isOk = true;
	for (let i = 0; i < locationAllSpan.length; i++) {
		if (
			(currPosition.start > locationAllSpan[i].start && currPosition.start < locationAllSpan[i].end) ||
			(currPosition.end > locationAllSpan[i].start && currPosition.end < locationAllSpan[i].end) ||
			(currPosition.end > locationAllSpan[i].end && currPosition.start < locationAllSpan[i].start)
		) {
			isOk = false;
		}
	}

	if (isOk) {
		// Ajout de l'objet dans le tableau
		if (currPosition.start != currPosition.end) {
			locationAllSpan.push(currPosition);

			//on crée la balise span
			createSpan(currPosition)
			sortTable();
	
			localStorage.setItem('table', JSON.stringify(locationAllSpan))
			
		}
	} else {
		alert('Selection invalide');
	}
}


function splitingText() {
	// on extrait le contenu du paragraph en string
	var myText = document.getElementById("annotation").textContent;
	endText = myText.length

	// Création du tableau qui découpe le texte en fonction des spans
	var arrTextNode = []
	var ancienSpanEnd = 0;
	// On crée l'objet qui contiendra les information de la span
	var contentSpan = {}

	//Insétion des valeurs dans la table
	locationAllSpan.forEach((span) => {
		contentSpan = {
			text: myText.slice(ancienSpanEnd, span.start)
		}
		arrTextNode.push(contentSpan)
		contentSpan = {
			text: myText.slice(span.start, span.end),
			color: span.colorSpan
		}
		arrTextNode.push(contentSpan)
		ancienSpanEnd = span.end
	});
	//on termine le tableau
	contentSpan = {
		text: myText.slice(ancienSpanEnd, endText)
	}
	arrTextNode.push(contentSpan);

	// Création de la variable qui va contenir le texte en entier avec les balises span
	var newText = "";

	for (let i = 0; i < arrTextNode.length; i++) {

		if (i % 2) {
			var span = '<span style="background-color:' + arrTextNode[i].color + '">' + arrTextNode[i].text + '</span>'
			newText += span
		} else {
			var text = arrTextNode[i].text
			newText += text
		}
	}

	document.getElementById("annotation").innerHTML = newText
}

function createSpan(currPosition) {
	var selection = window.getSelection().getRangeAt(0);
	var selectedText = selection.extractContents();
	var span = document.createElement("span");
	span.style.backgroundColor = currPosition.colorSpan;
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





function sortTable() {
	locationAllSpan.sort(function (a, b) {
		return parseFloat(a.start) - parseFloat(b.start);
	});
}

function getRandomColor() {
	var max = 6
	var min = 0
	var color = ""
	var numberAle = Math.floor(Math.random() * (max - min +1)) + min

	switch (numberAle) {
		case 0:
			color = '#c7fcbc'
			break;
		case 1:
			color = '#bcdffc'
			break;
		case 2:
			color = '#f8f89b'
			break;
		case 3:
			color = '#fcbcfa'
			break;
		case 4:
			color = '#bcfcf7'
			break;
		case 5:
			color = '#fcbcbc'
			break;

		default:
			break;
	}

	return color;
}


function removeMarks() {
	$(".Mark").each(function () {
		$(this).contents().unwrap();
	});
}