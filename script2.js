function selectBetweenTwoElements(element1, element2) {
	if (window.getSelection) {
			/* all browsers, except IE 8 and IE 7 */
			var selection = window.getSelection();
			selection.removeAllRanges();
			var range = document.createRange();
			range.setStart(element1, 0);
			range.setEnd(element2, 1);
			selection.addRange(range);
	} else {
			/* works fine in IE 8 / IE 7 */
			if (document.body.createControlRange) {
					var range1 = document.body.createTextRange();
					range1.moveToElementText(element1);

					var range2 = document.body.createTextRange();
					range2.moveToElementText(element2);

					var range = document.body.createTextRange();
					range.setEndPoint("StartToStart", range1);
					range.setEndPoint("EndToEnd", range2);
					range.select();
			}
	}
}
var p4 = document.getElementById("annotation");
var a = p4.textContent
var b = a.charAt(10)
console.log(p4);

var p5 = document.getElementById("annotation");

selectBetweenTwoElements(p4,p5)