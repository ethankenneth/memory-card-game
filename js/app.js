/*
 * Create a list that holds all of your cards
 */
 let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

// Set other variables
let openCard = [];
let moves = 0;
let starts = 3;
let matchFound = 0;
let startGame = false;
let starRating = "3";
let timer;

//Memory Game Logic
  // Shuffle cards (function from http://stackoverflow.com/a/2450976)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    } // End while loop
    return array;
} // End function shuffle

// Congratulations Popup
  // When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. Source: www.w3schools.com
function congratulations() {
// A user wins once all cards have successfully been matched.
  if (matchFound === 8) {
    var modal = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];
    //  It should also tell the user how much time it took to win the game, and what the star rating was.
    $("#total-moves").text(moves);
    $("#total-stars").text(starRating);
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    } // End span.onclick = function
   $("#play-again-btn").on("click", function() {
       location.reload()
   });
   clearInterval(timer);
 } // End if (matchFound === 8)
} // End function congratulations

// Create card
function createCard() {
  let cardList = shuffle(cards);
  cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
} // End function createCard

// Match function
function showCards() {
  // Show cards on click
  $(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return; }
    $(this).toggleClass("flipInY open show");
    openCard.push($(this));
    startGame = true;
// Add CSS animations when cards are successfully matched.
    if (openCard.length === 2) {
      if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
      openCard[0][0].classList.add("bounceIn", "match");
      openCard[1][0].classList.add("bounceIn", "match");
      $(openCard[0]).off('click');
      $(openCard[1]).off('click');
      matchFound += 1;
      moves++;
      removeOpenCards();
      congratulations();
      } else {
// Add CSS animations when cards are unsuccessfully matched.
      openCard[0][0].classList.add("shake", "wrong");
      openCard[1][0].classList.add("shake", "wrong");
      // Set timeout
      setTimeout(removeClasses, 1000);
      setTimeout(removeOpenCards, 1000);
      moves++;
    } // End else
    } // End if(openCard.length === 2)
// Game displays the current number of moves a user has made.
  moveCounter();
  }) // End onclick function
} // End function showCards

// Move Counter
function moveCounter() {
  if (moves === 1) {
    $("#movesText").text(" Move");
  } else {
    $("#movesText").text(" Moves");
  } // End else
  $("#moves").text(moves.toString());
// Star Rating
  // The game displays a star rating (from 1 to at least 3) that reflects the player's performance.
  if (moves > 0 && moves < 16) {
    starRating = starRating;
  } else if (moves >= 16 && moves <= 24) {
    $("#starOne").removeClass("fa-star");
    starRating = "2";
  } else if (moves > 32) {
    $("#starTwo").removeClass("fa-star");
    starRating = "1";
  } // End else if
} // End function moveCounter


// Reset to 0
function removeOpenCards() {
  openCard = [];
} // End function removeOpenCards

// Remove classes
function removeClasses() {
  $(".card").removeClass("show open flipInY bounceIn shake wrong");
  removeOpenCards();
} // End function removeClasses

// Disable clicks
function disableClick() {
 openCard.forEach(function (card) {
   card.off("click");
  })
} // End function disableClick

// Timer
  // When the player starts a game, a displayed timer should also start.
function startTimer() {
  let clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  })
} // End function startTimer

// Call functions
shuffle(cards);
createCard();
showCards();
startTimer();

// Restart Button
  // A restart button allows the player to reset the game board, the timer, and the star rating.
function restartGame() {
  $("#restart").on("click", function() {
      location.reload()
  });
} // End function restartGame

restartGame();
