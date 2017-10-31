/*
 * Create a Layout Manager that holds all of your cards
 */
var memoryGameLayoutManager = function() {
	this.listElements = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bomb", "fa-leaf", "fa-bicycle",
						"fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bomb", "fa-leaf", "fa-bicycle"];
	this.init();
	this.numberOfShownCards = 0;
	this.previousSelectedElement = undefined;
	this.currentSelectedElement = undefined;
};
memoryGameLayoutManager.prototype.init = function() {
	this.listElements = shuffle(this.listElements);
	var container = $(".deck");
	container.empty();
	for(let elementIndex in this.listElements) {
		let element = this.listElements[elementIndex];
		let liElement =  $("<li class='card' data-idx='"+elementIndex+"'> <i class='fa "+element+"'></i></li>");
		container.append(liElement);
	};
};
memoryGameLayoutManager.prototype.processCard = function(element) {
	switch(this.numberOfShownCards % 2) {
		case 0: // Card has to be just flipped
				this.flipCard(element);
				break;
		default: // Card has to be flipped
				 this.flipCard(element);
				// Check Match and yes do nothing
				// Else Revert with animation, Increase count and update star
	}
}
memoryGameLayoutManager.prototype.flipCard = function(element) {
	if (element.attr("class").indexOf("show") < 0) {
		element.addClass("show");
		this.previousSelectedElement = this.currentSelectedElement;
		this.currentSelectedElement = this.listElements[element.attr("data-idx")];
	}
};
memoryGameLayoutManager.prototype.matchCard = function(element) {
	element.addClass("show");
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
$( document ).ready(function() {
    let memoryGameLayoutManagerObj = new memoryGameLayoutManager();
    $(".restart").click(function() {
    	memoryGameLayoutManagerObj.init();
    });
    $(".deck").on("click", ".card", function (evt) {
    	memoryGameLayoutManagerObj.processCard($(this));
    });
});