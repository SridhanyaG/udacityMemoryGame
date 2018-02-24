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
        this.listElements = shuffle(["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bomb", "fa-leaf", "fa-bicycle",
                            "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bomb", "fa-leaf", "fa-bicycle"]);
     };

    /*
     * Create a Layout Manager that holds all of your cards
     */
    var MemoryGameLayoutManager = function() {
    	// Load the li elements
        this.init();
    };

    // Methods in Obj MemoryGameLayoutManager Begin

    MemoryGameLayoutManager.prototype.init = function() {
        this.cardProcessor = new Card();
        var container = $(".deck");
        container.empty();
        for(let elementIndex in this.cardProcessor.listElements) {
            let element = this.cardProcessor.listElements[elementIndex];
            let liElement =  $("<li class='card' data-idx='"+elementIndex+"'> <i class='fa "+element+"'></i></li>");
            container.append(liElement);
        }
    };

    /** This is for restart the game**/
    MemoryGameLayoutManager.prototype.restart = function() {
        this.init();
        this.resetStar();
        this.resetMoves();
    };

    MemoryGameLayoutManager.prototype.updateStar = function(element) {
        let currentStarToBeModified;
        /** Intially user is assigned with 3 stars and moves multiples of 10 the stars are removed */
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
       // On reset we need to reset to 3 stars
        $(".stars .fa").removeClass("fa-star-o");
        $(".stars .fa").addClass("fa-star");
    };

    MemoryGameLayoutManager.prototype.resetMoves = function(element) {
        $(".moves").text("0");
    };


    MemoryGameLayoutManager.prototype.processCard = function(element) {
        let justOpened = false;
        switch(this.cardProcessor.numberOfShownCards % 2) {
            case 0: // Card has to be just flipped
                    this.flipCard(element);
                    break;
            default: // Card has to be flipped
                     justOpened = this.flipCard(element);
                    // Check Match and yes do nothing
                    if (justOpened) {
                        this.matchCard(element);
                    }
        }
    };
    MemoryGameLayoutManager.prototype.flipCard = function(element) {
       // Every move card has to be flipped and housekeeping stuff of remembering the move to compare.
        let classList = element.attr("class");
        if (classList.indexOf("show") < 0 && classList.indexOf("match") < 0) {
            element.addClass("open");
            element.addClass("show");
            this.cardProcessor.previousSelectedElement = this.cardProcessor.currentSelectedElement;
            this.cardProcessor.currentSelectedElement = this.cardProcessor.listElements[element.attr("data-idx")];
            this.cardProcessor.previousLiElement = this.cardProcessor.currentLiElement;
            this.cardProcessor.currentLiElement = element;
            this.cardProcessor.numberOfShownCards++;
            return true;
        } else {
            return false;
        }
    };
    MemoryGameLayoutManager.prototype.matchCard = function(element) {
      // When it is a even number move apart from flipping match has to happen
      // Logic takes a while and hence user is stopped from clicking using block ui
        let delay = 1000;
        let self = this;
        this.cardProcessor.numberOfMoves++;
        this.cardProcessor.currentLiElement.addClass("shake");
        this.cardProcessor.previousLiElement.addClass("shake");
        $(".moves").text(this.cardProcessor.numberOfMoves);
        $.blockUI({message: "Validating ...."});
        if (this.cardProcessor.previousSelectedElement !== this.cardProcessor.currentSelectedElement) {
            this.cardProcessor.previousLiElement.addClass("error");
            this.cardProcessor.currentLiElement.addClass("error");
            this.cardProcessor.numberOfShownCards -=2;
        }
        setTimeout(function() {
            self.processMatch(element);
        }, delay);
    };
    MemoryGameLayoutManager.prototype.processMatch = function(element) {
      // Match needs to show which two cards are compared with animation
        this.cardProcessor.previousLiElement.removeClass("show");
        this.cardProcessor.currentLiElement.removeClass("show");
        this.cardProcessor.previousLiElement.removeClass("open");
        this.cardProcessor.currentLiElement.removeClass("open");
        this.cardProcessor.previousLiElement.removeClass("shake");
        this.cardProcessor.currentLiElement.removeClass("shake");
        this.cardProcessor.previousLiElement.removeClass("error");
        this.cardProcessor.currentLiElement.removeClass("error");
        // If both are equal
        if (this.cardProcessor.previousSelectedElement === this.cardProcessor.currentSelectedElement) {
            this.cardProcessor.currentLiElement.addClass("match");
            this.cardProcessor.previousLiElement.addClass("match");
            $("#moveno").text(this.cardProcessor.numberOfMoves);
            $("#starno").text(this.cardProcessor.numberOfStars);
            if (this.cardProcessor.numberOfShownCards === 16) {
                $.unblockUI();
                $.blockUI({
                    message: $('.resultPanel'),
                    css: { 
                        width: '50%',
                        height: '100%',
                        top: '10%',
                        left: '30%'
                    }
                });
                return;
            }
        } 
        $.unblockUI(); // UI is now unblocked to allow user interaction
        this.cardProcessor.previousLiElement = undefined;
        this.cardProcessor.currentLiElement = undefined;
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
        // Events for interaction
        $(".restart").click(function() {
        	memoryGameLayoutManagerObj.restart();
        });
        $(".deck").on("click", ".card", function (evt) {
        	memoryGameLayoutManagerObj.processCard($(this));
        });
        $("#playAgainBtn").click(function() {
            memoryGameLayoutManagerObj.restart();
            $.unblockUI();
        });
    });
})();