# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
# udacityMemoryGame

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
+ Reset the Game by clicking the reset button
