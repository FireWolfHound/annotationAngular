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
		locationAllSpan.push(currPosition);

		//on crée la balise span
		createSpan(currPosition)
		sortTable();

		console.log(locationAllSpan);

		localStorage.setItem('table', JSON.stringify(locationAllSpan))

	} else {
		console.log('Déja dans le surlignement');
	}
}


function splitingText() {
	// on extrait le contenu du paragraph en string
	var myText = document.getElementById("annotation").textContent;
	endText = myText.length

	// Création du tableau qui découpe le texte en fonction des spans
	var arrTextNode = []
	var ancienSpanEnd = 0;

	//Insétion des valeurs dans la table
	locationAllSpan.forEach((span) => {
		arrTextNode.push(myText.slice(ancienSpanEnd, span.start))
		arrTextNode.push(myText.slice(span.start, span.end))
		ancienSpanEnd = span.end
	});
	//on termine le tableau
	arrTextNode.push(myText.slice(ancienSpanEnd, endText));

	// Création de la variable qui va contenir le texte en entier avec les balises span
	var newText = "";
	var color = "";

	console.log(arrTextNode);
	console.log(locationAllSpan);


	for (let i = 0; i < arrTextNode.length; i++) {
		 if (i % 2) {
			var span = '<span style="background-color:' + color + '">' + arrTextNode[i] + '</span>'
			newText += span
		} else {
			var text = arrTextNode[i]
			newText += text
		}
	}

	console.log(newText);
	document.getElementById("annotation").innerHTML = newText
}

function createSpan(currPosition) {
	var selection = window.getSelection().getRangeAt(0);
	var selectedText = selection.extractContents();
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





function sortTable() {
	locationAllSpan.sort(function (a, b) {
		return parseFloat(a.start) - parseFloat(b.start);
	});
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