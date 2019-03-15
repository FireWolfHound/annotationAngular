function splitingText() {
	var myText = document.getElementById("annotation").textContent;
	endText = myText.length

	var arrTextNode = []
	var arrTextBeforeNode = []
	var arrTextAfterNode = []
	var ancienSpanEnd = 0;

	locationAllSpan.forEach((span) => {
		arrTextBeforeNode.push(myText.slice(0, span.start))
		arrTextNode.push(myText.slice(span.start, span.end))
		ancienSpanEnd = span.end
		arrTextAfterNode.push(myText.slice(ancienSpanEnd, endText));
	});


	// document.getElementById("annotation").firstChild.data = arrTextBeforeNode[0]
	// document.getElementById("annotation").lastChild.data = arrTextAfterNode[0]

	console.log(document.getElementById("annotation"));
	


	var reinitialiseSpan = 0;
	var endOffsetValue = 2;
	var ancienSpanEnd = 0;

	for (let i = 0; i < arrTextNode.length; i++) {

		reinitialiseSpan = locationAllSpan[i].start - ancienSpanEnd;

		var textBeforeNode = document.createTextNode(arrTextBeforeNode[i]);
		var range = document.createRange();
		range.setStart(textBeforeNode, locationAllSpan[i].start);
		console.log(range);

		range.setEnd(document.getElementById("annotation"), reinitialiseSpan)
		console.log(range);

		var b = range.createContextualFragment(arrTextBeforeNode[i]);
		console.log(b);
		console.log(range);

		var textnode = document.createTextNode(arrTextNode[i]);


		var span = document.createElement("span");
		span.appendChild(b);
		range.insertNode(span)

		ancienSpanEnd = locationAllSpan[i].end
		endOffsetValue +=2
		console.log(endOffsetValue);
		

	}

}