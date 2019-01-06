/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var dice, currentScore, activePlayer, scores, gameActive,scoreToWin;

init();

var lastDice;
if(scoreToWin===''){
	scoreToWin = 20;
}

console.log(scoreToWin);
document.querySelector('.btn-roll').addEventListener('click' ,function(){
	if(gameActive){
		dice = Math.floor(Math.random() *6)+1;


	    var diceImg = document.querySelector('.dice');
	    	diceImg.style.display = 'block';
	    	diceImg.src = 'dice-'+dice+ '.png';
	    console.log(dice, lastDice)
	    if(dice===6 && lastDice >=2){
	    	console.log('next!');
	    	document.getElementById('score-'+activePlayer).textContent = 0;
	    	scores[activePlayer] = 0;
	    	nextPlayer();
	    }
		if(dice == 1 ){
			nextPlayer();
		}else{
			currentScore +=  dice;

		}
		document.getElementById('current-'+activePlayer).textContent = currentScore;
		lastDice = dice;
		//console.log('dice ' +dice);
		//console.log('currentScore ' + currentScore);
	}
})


document.querySelector('.btn-hold').addEventListener('click' ,function(){
	if(gameActive){
		scores[activePlayer] +=  currentScore;
		document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
		document.getElementById('current-'+activePlayer).textContent = 0;
		
		//console.log('scores ' + scores[activePlayer]);

		if(scores[activePlayer] >= scoreToWin){
			document.querySelector('.dice').style.display = 'none';
			document.getElementById('name-'+activePlayer).textContent = 'Winner';
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			gameActive = false;
		}else{
			nextPlayer();	
		}
	}

});

document.querySelector('.final-score').addEventListener('change' ,init);
document.querySelector('.btn-new').addEventListener('click' ,init);


function nextPlayer(){
	document.getElementById('current-'+activePlayer).textContent = 0;

	activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
	lastDice =0;
	currentScore = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}
function init(){
	gameActive =true;
	scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
  
    scoreToWin = document.querySelector('.final-score').value;

    console.log('score to win ' + scoreToWin);

    document.querySelector('.dice').style.display = 'none';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0').textContent =  'Player 1';
    document.getElementById('name-1').textContent =  'Player 2';

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
