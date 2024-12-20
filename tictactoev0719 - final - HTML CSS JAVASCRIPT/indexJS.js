
var gameForm = document.getElementById("gameForm");
// var gameKey = document.getElementById("inputGameKey").value.trim();
// var inputPlayerName = document.getElementById("inputPlayerName").value.trim();
var messageElement1 = document.getElementById('message1');
var messageElement2 = document.getElementById('message2');

var flgPlayer1Entered = false;
var flgPlayer2Entered = false;
var flgOtherPlayer = false;
var flgGameStarted = false;
// var resetGameButton = document.getElementById("resetGame");
// resetGameButton.addEventListener("click", resetGameID);

gameForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission and page reload

  var inputPlayerName = document.getElementById("inputPlayerName").value.trim();
  var gamePlayerName ="";
  if (inputPlayerName && inputPlayerName !== '') {
    gamePlayerName = inputPlayerName;
  } else{
    gamePlayerName = "NoName";
  }

  var gameKey = document.getElementById("inputGameKey").value.trim();

  if (gameKey && gameKey !== '') {
    joinGame(gameKey,gamePlayerName);
  } else {
    messageElement1.textContent = "Invalid game key. Blank GameKey not applicable";
  }

  // setInterval(function() {
  //   checkStartGame(gameKey);
  // }, 3000);

});


function joinGame(gameKey,gamePlayerName) {
  var url = "http://localhost:8080/tictactoe/tictactoeserver/check?key="+ gameKey;

  fetch(url)
  .then(response => response.text())
  .then(data => {
      console.log(data);
      console.log("checkGame response data: "+data);
      if (data === "true") {

        flgGameStarted = true;
        // messageElement1.textContent = "Game \""+gameKey+"\" has 2 players already. Think of other Game ID instead then re-try"; 
        messageElement1.innerHTML = "Game \""+gameKey+"\" has 2 players already. <br>Think of other Game ID instead then re-try."; ;
      } else  {

        if(!flgGameStarted && !flgOtherPlayer){
          enterGame(gameKey,gamePlayerName);
          setInterval(function() {
            checkStartGame(gameKey);
          }, 3000);
        }

      }       
  })
  .catch(error => {
      console.error('Error:', error);
      messageElement1.innerHTML = "User not connected to Server. Verify Server availability.<br>Ensure to establish connection in Payara Server then retry \"Join Game\".";
  });

}


function enterGame(gameKey,gamePlayerName){
  var url = "http://localhost:8080/tictactoe/tictactoeserver/createGame?key=" + gameKey;
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;      
      console.log("enterGame response: "+response);
      if (response === "X") {
        flgPlayer1Entered = true;
        messageElement1.textContent = "Player 1(X) entered the Game";
        // var url = "https://tonxydsnoob.000webhostapp.com/gameboard.html?key=" + encodeURIComponent(gameKey)+ "&playerID="+ encodeURIComponent(response);
        var url = "gameboard.html?key=" + encodeURIComponent(gameKey)+ "&playerID="+ encodeURIComponent(response)+ "&playerName="+ encodeURIComponent(gamePlayerName);        
        window.location.href = url;
      } else if (response === "O") {
        flgPlayer2Entered = true;
        messageElement1.textContent = "Player 2(O) entered the Game";
        // var url = "https://tonxydsnoob.000webhostapp.com/gameboard.html?key=" + encodeURIComponent(gameKey)+ "&playerID="+ encodeURIComponent(response);
        var url = "gameboard.html?key=" + encodeURIComponent(gameKey)+ "&playerID="+ encodeURIComponent(response)+ "&playerName="+ encodeURIComponent(gamePlayerName);        
        window.location.href = url;
      } else if (response === "[GAME ALREADY STARTED]") {
        flgOtherPlayer = true;
        messageElement2.textContent = "Game \""+gameKey+"\" already started. Create New Game instead";

      }  
      console.log("enterGame: "+response); 
    }  
  };
  xhr.send();

}


// function resetGameID(gameKey){
//   var url = "http://localhost:8080/tictactoe/tictactoeserver/reset?key="+ gameKey;

//   fetch(url)
//   .then(response => response.text())
//   .then(data => {
//       console.log(data);
//       window.alert(data);
//       // var url = "https://tonxydsnoob.000webhostapp.com";
//       var url = "index.html";
//       window.location.href = url;
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });
// }

function checkStartGame(gameKey){
  var url = "http://localhost:8080/tictactoe/tictactoeserver/check?key="+ gameKey;

  fetch(url)
  .then(response => response.text())
  .then(data => {

      console.log(data);
      console.log("checkGame response data: "+data);
      if (data === "true") {

        if(!flgOtherPlayer){
          // var url = "https://tonxydsnoob.000webhostapp.com/gameboard.html?key=" + encodeURIComponent(gameKey); 
          var url = "gameboard.html?key=" + encodeURIComponent(gameKey); 
          window.location.href = url;           
        }

      } else  {
        messageElement1.textContent = "Still waiting for opponent to join";
        flgCheckGame = false;
      }        
      
  })
  .catch(error => {
      console.error('Error:', error);
  });

}


