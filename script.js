
var locationAllSpan = [];

$("#annotation").on("detetctClick", function(){
	$(this)
		.mousemove(function(event) { 
			var coords = {
				x: event.pageX,
				y: event.pageY 
			}

//			console.log(coords);
			
		})
		.mouseup(function() { 
			var startIndex = window.getSelection().anchorOffset;
			var endIndex = window.getSelection().focusOffset;
			if (startIndex != endIndex) {
				 locationAllSpan.forEach(span => {
					if (!(startIndex > span.startIndex && startIndex < span.endIndex) || !(endIndex > span.startIndex && endIndex < span.endIndex)) {
						var spanLocation = {
							startIndex,
							endIndex
						}
					}
				});

				if (locationAllSpan.length === 0) {
					var spanLocation = {
						startIndex,
						endIndex
					}				
				}

					locationAllSpan.push(spanLocation)
					console.log(locationAllSpan)
					console.log("----------------------------------");
				}
		})
})

$("#annotation").trigger("detetctClick");

