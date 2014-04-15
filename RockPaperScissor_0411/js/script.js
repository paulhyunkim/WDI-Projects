var ruleBook = ["rock", "paper", "scissor", "rock", "paper"];

function play() {
  var playerChoice = this.id;
  var compChoice = randGenerator();
  whoWins(playerChoice, compChoice);
}

function whoWins(playerChoice, compChoice) {
  var playerIndex = ruleBook.indexOf(playerChoice);
  var ruleForHand = ruleBook.slice(playerIndex, playerIndex + 3);
  var compIndex = ruleForHand.indexOf(compChoice);

  document.getElementById('player').innerHTML = "You chose: " + playerChoice;
  document.getElementById('comp').innerHTML = "Computer chose: " + compChoice;

  if (compIndex == 0) {
    document.getElementById('result').innerHTML="You Tie!";
  } else if (compIndex == 1) {
     document.getElementById('result').innerHTML="You Lose!";
  } else if (compIndex == 2) {
     document.getElementById('result').innerHTML="You Win!";
  }
}
  
function randGenerator() {
  var randNum = Math.floor((Math.random()*3));
  if (randNum == 0) {
    return "rock";
  } else if (randNum == 1) {
    return "paper";
  } else if (randNum == 2) {
    return "scissor";
  }
}

function startup() {
  var buttons = document.getElementsByClassName('button');
  for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = play;
  }
}

window.onload = startup;