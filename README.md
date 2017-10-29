# udacityMemoryGame
> The Memory Game Project is all about demonstrating your mastery of HTML, CSS, and JavaScript. 
> You’ll build a complete browser-based card matching game (also known as Concentration). 
> But this isn’t just any memory game! It’s a shnazzy, well-designed, feature-packed memory game!

> The styling of the game is up to you, but here's what we came up with:

#UseCases on click of the square box

+ Flip open and leave it open if it is odd number card
+ For Even Number Cards
  - Match the card with the previous open one and if matches leave this card also open
    * Increase the number of moves
  - If it is a mismatch, using animation slow flip and close current and previous cards
    * Increase the number of moves 
    * for every multiples of 10 decrease t he star count
+ If current card count is equal to number of cards , assume it is the last card and show congradulation message with You won message
    - No of Moves
    - No Of stars
