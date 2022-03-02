/*
Game Rules:
The game will have 3 players, who play in rounds
 each turn, a player will roll a dice as many times as they want
 each result will get a score added to a current_score
 if a player rolls a 1 all scores === 0
 if a player rolls a 1 or chooses to hold that means the next player's turn is up
 if a player holds before rolling a 1 they keep the score that they
 Global Score: each player has one
 Win: First player to score 100 points on a global score will win the game

 // challenges
 a player can lose the entire score if they roll two 6's in a row
 the player can set the final score, so it doesn't equal 100
 add another dice to the game so there two dices
 the player will lose their score if either dice is a 1;
*/

var scores, roundScore, activePlayer, gamePlaying;

var lastDice;

// init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    // gamePlaying is going to be set to true
    if(gamePlaying) {
        // roll two random numbers
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;

        // display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-'+ diceOne + '.png';
        document.getElementById('dice-2').src = 'dice-'+ diceTwo + '.png';
    
        // update the socre if the number rolled was not 1
        if(diceOne !== 1 && diceTwo !== 1) {
            // add score
            roundScore += diceOne + diceTwo;
            document.querySelector('#current-'+activePlayer).textContent =  roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    // add current score to our global score
    scores[activePlayer] += roundScore;

    //update the ui
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    var input = document.querySelector('.final-score').value;
    var winningScore;

    // any input is undefined, 0 null, or an empty string "" === false
    if(input) {
        winningScore = input;
    } else {
        winningScore = 100;
    }

    // check to see if a player has won the game
    if(scores[activePlayer] >= winningScore) {
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!!';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init)

function nextPlayer() {
    //this will determine when the nextPlayer is active
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    // set currentScore to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // toggle active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // reset the dice before the next player rolls
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // set the dice to display none
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // set the score text to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // set name
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // start game fresh, with no winner and no active player
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // start game with player 1 being active
    document.querySelector('.player-0-panel').classList.add('active');
}
