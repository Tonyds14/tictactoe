# tictactoe - html, css, js
exercise for tictactoe
- html,javascript and css - for the user interface. 2 active browser for each players

Pre-requisites
1. payara-5.2021.8 installed
2. jre-8u371-windows-x64.exe
3. TicTacToeServer.war (war file) was given and should be deployed in payara server
4. launching of web app is thru VS Code (Live Server Extension should also be installed).

Starting Payara Server
1. go to directory where the "asadmin.bat" was located, and typein "CMD" - to open command prompt

![image](https://github.com/user-attachments/assets/2d5e611d-2743-43d5-87dc-0e916389aa1a)

2. type in "asadmin start-domain"

![image](https://github.com/user-attachments/assets/33a84b8e-8d44-4cf0-b0ec-606ec5519c8d)

3. go to payara server console (web). In your browser, go to http://localhost:8080 to see the default landing page.

![image](https://github.com/user-attachments/assets/34250165-c4b3-403d-8373-c46965d3e202)

4. click on "go to Administration Console"

![image](https://github.com/user-attachments/assets/c7e717fe-fcb1-4652-8ac8-362288c0e0df)

Deploying application in payara server.
1. Click on the "Applications"

![image](https://github.com/user-attachments/assets/8f534474-879c-4ea1-8d6c-888924462121)

2. Click on "Deploy" - and "Choose File" - locate the war file to be installed.

![image](https://github.com/user-attachments/assets/9cd1fdb6-d1dc-4680-9de1-4d8ecc77f5a3)

![image](https://github.com/user-attachments/assets/acf10c4d-de61-49f6-9377-2a6380ae8ade)

![image](https://github.com/user-attachments/assets/7ea30561-4e99-4581-8b6c-a62ed647b3fe)

Launching the game
1. download the folder "tictactoev0719 - final - HTML CSS JAVASCRIPT"
2. Open VS code, and open the extracted folder to import html, css and js.

![image](https://github.com/user-attachments/assets/4b17c02f-b3c7-483e-a94c-97605913b1d4)

3. right click on the "index.html" - and click "Open with Live Server". below is the landing page.

![image](https://github.com/user-attachments/assets/9d12cc51-93e1-4302-ae12-510133a23691)

4. Player 1 Join - Player Name and Game ID. e.g. Player1, G1, then click "Join Game" button

![image](https://github.com/user-attachments/assets/434472ba-009e-47c7-aa05-fcff4eed3319)

5. Player 2 Join - relaunch "index.html" to open another browser. use the same GameID

![image](https://github.com/user-attachments/assets/59bc2cc8-6e11-4f6c-bc0b-ac953e05ea12)

Player 1 as X, Player 2 as O

![image](https://github.com/user-attachments/assets/4c91fa4f-9143-4c7b-b0e3-bbbdaa1a5987)

6. Player 1/X - turn. will have a delay in synch-up of board data with player 2/O

![image](https://github.com/user-attachments/assets/e137c864-e086-43d1-b7ad-0c89ec8f15f6)

7. in case of invalid move, message for the opponent to make 2 turns

![image](https://github.com/user-attachments/assets/04c207e3-7398-4297-84a1-395372a44d7f)

8. message when 1 player wins the game

![image](https://github.com/user-attachments/assets/8dbc897c-841b-4b58-8150-d33f73b2fa0a)

9. when 1 player got disconnected or quit the game.

![image](https://github.com/user-attachments/assets/79d54870-6846-4845-8e62-2ab529e21baf)

Note:
This is the initial version and still has some scenario not covered. 
This version has no DB, and data is only stored in array. No reference for historical data.

behavior of servelet(TicTacToeServer.war) was documented in https://docs.google.com/spreadsheets/d/1jP6NO8skG2vtiAorDTwfy1PRW1Wvz7PMHVbN30efbbY/edit?usp=sharing
