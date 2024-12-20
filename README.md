# tictactoe
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

Launching the game
