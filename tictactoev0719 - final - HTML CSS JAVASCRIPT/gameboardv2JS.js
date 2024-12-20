const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const gameKey = urlParams.get('key');
const playerID = urlParams.get('playerID');
const playerName = urlParams.get('playerName');
const cellMarker = playerID;

var gameIdTitle = document.getElementById("gameIdTitle");
var playerIDElement = document.getElementById("playerID");
var player1Element = document.getElementById("player1");
var player2Element = document.getElementById("player2");
var cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText"); 
var gameBoardResp = document.getElementById("gameboard-response");
// const restartBtn = document.querySelector("#restartBtn");
const quitGameButton = document.getElementById("quitGame");

const clickHandler = (event) => clickCell(event.target, gameKey, playerID);

var turnMessage = "";
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;

gameIdTitle.textContent += " " + gameKey;
// console.log(gameKey);
// playerIDElement.textContent +=  " Player "+playerID;
playerIDElement.textContent += " Player "+playerID+": "+playerName;

var intervalId = setInterval(function() {
  signalStartGame(gameKey,playerID);
}, 3000);

var player1Name ="";
var player2Name ="";

function signalStartGame(gameKey,playerID){
  console.log("playerID "+playerID);
  if (playerID === "X") {
    // const player1Value = "Player X";
    // player1Element.textContent = player1Value;
    player1Element.textContent = playerName;
    player1Name = playerName;
  } else if (playerID === "O") {
    // const player2Value = "Player O";
    // player2Element.textContent = player2Value;
    player2Element.textContent = playerName;
    player2Name = playerName;
  }

  var url = "http://localhost:8080/tictactoe/tictactoeserver/check?key="+ gameKey;
  fetch(url)
  .then(response => response.text())
  .then(data => {
      console.log(data);
      console.log("checkGame response data: "+data);
      if (data === "true") {
        running = true;
        statusText.textContent = "Start Game. Player X's turn.";

        if (playerID === "X") {
          playersHeading.textContent = "Player X vs Player O";
        } else if (playerID === "O") {
          playersHeading.textContent = "Player O vs Player X";
        }

        processGame(gameKey,playerID);

        clearInterval(intervalId);
      } else  {
        statusText.textContent = "Still waiting for opponent to join";
      }         
  })
  .catch(error => {
      console.error('Error:', error);
  });

}


function processGame(gameKey,playerID){
    cells.forEach((cell) => cell.addEventListener("click", clickHandler));

    // restartBtn.addEventListener("click", restartGame);
    
    running = true;

    setInterval(function() {
      showBoardInfo(gameKey);
    }, 1000);
}


function clickCell(cell, gameKey, playerID) {
  console.log("clickCell playerID " + playerID);
  var cellID = cell.getAttribute("cellIndex");
  var position = parseInt(cellID);
  var xPos = position % 3;
  var yPos = Math.floor(position / 3);
  sendPlyrMoveRequest(gameKey, playerID, yPos, xPos, cellID);
}

function sendPlyrMoveRequest(gameKey,playerID,yPos,xPos,cellID){
    var url = "http://localhost:8080/tictactoe/tictactoeserver/move?key="+gameKey +"&tile="+playerID+"&y="+yPos+"&x="+xPos;
    fetch(url)
        .then(function(response) {
        return response.text();
      })
        .then(function(responseText) {
        if (responseText.includes("[TAKEN]")) {
          console.log("Tile is taken!");
          statusText.textContent = "Invalid Move. Tile is already taken.";
        } else {
          console.log("Move successful!");
          options[cellID] = cellMarker;

          // console.log("options: "+options);

          showBoardInfo(gameKey);
        }
      })
      .catch(function(error) {
        console.log("Error occurred:", error);
      });

};





function showBoardInfo(gameKey){

    var url = "http://localhost:8080/tictactoe/tictactoeserver/board?key=" +gameKey;
    fetch(url)
      .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Error Server not available");
        }
      })
      .then((boardInfo) => {
        if (boardInfo === "[GAME NOT YET STARTED]") {
          // gameBoardResp.textContent = "GAME NOT YET STARTED";
          gameBoardResp.textContent = "Opponent got disconnected or Quit the Game.";
          // gameBoardResp.innerHTML ="Opponent got disconnected or Quit the Game. <br> \"Quit\" then \"Join\" to play another game.";

          setTimeout(function() {
            location.reload();
          }, 3000);

        } else {
          var cells = document.querySelectorAll(".cell");
          var boardInfoArr = boardInfo.split(":");     
          for (var i = 0; i < cells.length; i++) {
            cells[i].textContent = boardInfoArr[i] || ""; 
            options[i] = boardInfoArr[i] || ""; //update options array

            cells[i].classList.remove("X", "O");
            if (boardInfoArr[i] === "X") {
              cells[i].classList.add("X");
            } else if (boardInfoArr[i] === "O") {
              cells[i].classList.add("O");
            }
          }

          // console.log("showBoard options"+options);
          displayTurnMessage();          
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  
};


function displayTurnMessage(){
  var ctrMove = 0;
  var countX = 0;
  var countO = 0;
  var turnMessage = "";
  var flgValidMove = true;
  var playerTurnID ="X";
  
  for (var i = 0; i < options.length; i++) {
    if (options[i] === "X") {
      countX++;
    } else if (options[i] === "O") {
      countO++;
    }
  }

  ctrMove = countX+countO;
  if (ctrMove % 2 === 0) {
    playerTurnID = "X";
  } else {
    playerTurnID = "O";
  }

  // console.log("ctrMove: "+ctrMove);
  // console.log("Count of 'X': " + countX);
  // console.log("Count of 'O': " + countO);
  // console.log("playerTurnID: "+playerTurnID);

  if (countX === 0 && countO === 0) {
    turnMessage = "X's turn";
  } else if (countX === countO) {
    turnMessage = "X's turn";
  } else if (countX === countO + 1) {
    turnMessage = "O's turn";
  } else {
    flgValidMove = false;    
    // turnMessage ="invalid move. one player to make 2 turns.";
    //X need to make 2 turns
    //O need to make 2 turns

    // turnMessage = "Invalid state. \"Quit\" then \"Join\" to play another game.";
    // flgValidMove = false;
    // running = false;
    // cells.forEach((cell) => cell.removeEventListener("click", clickHandler));
  }
  
  if(!flgValidMove){
    if(playerTurnID ==="X"){
      turnMessage ="X invalid move. O to make 2 turns.";
    } else {
      turnMessage ="O invalid move. X to make 2 turns.";
    }
  }

  // console.log(turnMessage);
  statusText.textContent = turnMessage;

  if(flgValidMove) {
    checkWinner(gameKey);
  }

}

function checkWinner(){
  let roundWon = false;
  var winningPlayer = "";

  for(let i = 0; i < winConditions.length; i++){
      const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if(cellA == "" || cellB == "" || cellC == ""){
          continue;
      }
      if(cellA == cellB && cellB == cellC){
          winningPlayer = cellA;
          roundWon = true;
          break;
      }
  }

  if(roundWon){
      statusText.textContent = winningPlayer +" wins the Game!";
      gameBoardResp.textContent = "\"Quit\" to play another game."
      running = false;
  }
  else if(!options.includes("")){
      statusText.textContent = `Draw!`;
      running = false;
  }

  if(!running){
    cells.forEach((cell) => cell.removeEventListener("click", clickHandler));
  }

}


// restartBtn.addEventListener("click", function() {
//   restartGame(gameKey);
// });

// function restartGame(gameKey){

//   options = ["", "", "", "", "", "", "", "", ""];
//   statusText.textContent = `Player X's turn`;
//   cells.forEach(cell => cell.textContent = "");
//   running = true;

//   //trigger reset
//   //trigger createGame

// }


quitGameButton.addEventListener("click", exitGame);

function exitGame(){
  var url = "http://localhost:8080/tictactoe/tictactoeserver/reset?key="+ gameKey;

  fetch(url)
  .then(response => response.text())
  .then(data => {
      console.log(data);
      // var url = "https://tonxydsnoob.000webhostapp.com";
      var url = "index.html";
      window.location.href = url;
  })
  .catch(error => {
      console.error('Error:', error);
  });

}
