(function app() {
    /* 
     * Card has variables to remember state
     */
     var Card = function() {
        this.numberOfShownCards = 0;
        this.previousSelectedElement = undefined;
        this.currentSelectedElement = undefined;
        this.previousLiElement = undefined;
        this.currentLiElemen = undefined;
        this.numberOfMoves = 0;
        this.numberOfStars = 3;
     };

    /*
     * Create a Layout Manager that holds all of your cards
     */
    var MemoryGameLayoutManager = function() {
    	this.listElements = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bomb", "fa-leaf", "fa-bicycle",
    						"fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bomb", "fa-leaf", "fa-bicycle"];
    	// Load the li elements
        this.init();
    };

    // Methods in Obj MemoryGameLayoutManager Begin

    MemoryGameLayoutManager.prototype.init = function() {
        this.listElements = shuffle(this.listElements);
        this.cardProcessor = new Card();
        var container = $(".deck");
        container.empty();
        for(let elementIndex in this.listElements) {
            let element = this.listElements[elementIndex];
            let liElement =  $("<li class='card' data-idx='"+elementIndex+"'> <i class='fa "+element+"'></i></li>");
            container.append(liElement);
        };
    };

    MemoryGameLayoutManager.prototype.restart = function() {
        this.init();
        this.resetStar();
        this.resetMoves();
    };

    MemoryGameLayoutManager.prototype.updateStar = function(element) {
        let currentStarToBeModified = undefined;
        switch(this.cardProcessor.numberOfMoves) {
            case 10: currentStarToBeModified = $(".stars .fa")[2]; break;
            case 20: currentStarToBeModified = $(".stars .fa")[1]; break;
            case 30: currentStarToBeModified = $(".stars .fa")[0]; break;
            default: return;
        }
        $(currentStarToBeModified).removeClass("fa-star");
        $(currentStarToBeModified).addClass("fa-star-o"); 
        this.cardProcessor.numberOfStars--;
    };

    MemoryGameLayoutManager.prototype.resetStar = function(element) {
        $(".stars .fa").removeClass("fa-star-o");
        $(".stars .fa").addClass("fa-star");
    };

    MemoryGameLayoutManager.prototype.resetMoves = function(element) {
        $(".moves").text("0");
    };


    MemoryGameLayoutManager.prototype.processCard = function(element) {
        switch(this.cardProcessor.numberOfShownCards % 2) {
            case 0: // Card has to be just flipped
                    this.flipCard(element);
                    break;
            default: // Card has to be flipped
                     this.flipCard(element);
                    // Check Match and yes do nothing
                    this.matchCard(element);
                    // Else Revert with animation, Increase count and update star
        }
    }
    MemoryGameLayoutManager.prototype.flipCard = function(element) {
        if (element.attr("class").indexOf("show") < 0) {
            element.addClass("open");
            element.addClass("show");
            this.cardProcessor.previousSelectedElement = this.cardProcessor.currentSelectedElement;
            this.cardProcessor.currentSelectedElement = this.listElements[element.attr("data-idx")];
            this.cardProcessor.previousLiElement = this.cardProcessor.currentLiElement;
            this.cardProcessor.currentLiElement = element;
            this.cardProcessor.numberOfShownCards++;
        }
    };
    MemoryGameLayoutManager.prototype.matchCard = function(element) {
        let delay = 1000;
        let self = this;
        this.cardProcessor.numberOfMoves++;
        $(".moves").text(this.cardProcessor.numberOfMoves);
        if (this.cardProcessor.previousSelectedElement === this.cardProcessor.currentSelectedElement) {
            this.cardProcessor.currentLiElement.addClass("match");
            this.cardProcessor.previousLiElement.addClass("match");
            if (this.cardProcessor.numberOfShownCards === 16) {

            }
        } else {
            this.cardProcessor.currentLiElement.effect( "shake", "slow" );
            this.cardProcessor.previousLiElement.effect( "shake", "slow" );
            $.blockUI({message: "Validating ...."});
            setTimeout(function() {
                self.cardProcessor.numberOfShownCards -= 2;
                self.cardProcessor.previousLiElement.removeClass("show");
                self.cardProcessor.currentLiElement.removeClass("show");
                $.unblockUI();
             }, delay);
        }
        this.updateStar(element);
    };

    // Methods in Obj MemoryGameLayoutManager End


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
        let memoryGameLayoutManagerObj = new MemoryGameLayoutManager();
        $(".restart").click(function() {
        	memoryGameLayoutManagerObj.restart();
        });
        $(".deck").on("click", ".card", function (evt) {
        	memoryGameLayoutManagerObj.processCard($(this));
        });
    });
})();