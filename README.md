# Flash-Frontend
The Flash-Frontend web app is designed as a front end to access my api server for the purpose of making and playing with flashcards.

This app uses my api on a server I created using Node.js at https://immense-reaches-83300.herokuapp.com/ .  Without the api the app will not function.

The purpose of this app is to create and use flashcards.  Currently it only holds one set of cards on the topic US History.  I plan to add the ability to add more topics for flashcards in the future.  The user may add their own cards to the database in either a 'basic' format or a 'cloze' format. 

In the Basic format the flashcard is entered with a question to appear (front) and an answer for the question (back). The user is limited to inputing a maximum of 128 characters for the question (front) and 50 characters (back) for the answer.  There is a counter on the right side of the input box to let the user know how many chacters are left.  During gameplay the app will display the question and compare the user input to the answer.  All text is converted to lower case for the compare so capitalization doesn't matter, but spelling does.  The results are then displayed on the screen with the correct answer and the next question.

In the Cloze format the flashcard is entered with a statement of fact (front) and the key fact from the statement (back). he user is limited to inputing a maximum of 128 characters for the question (front) and 50 characters (back) for the answer.  There is a counter on the right side of the input box to let the user know how many chacters are left.  Before the information is stored in the database the server adds a third column of cloze to the dataset.  The cloze format is created by replacing the key fact with "..." . During gameplay the cloze statement is displayed for the user and  the key fact is compared to the user input.  All text is converted to lower case for the compare so capitalization doesn't matter, but spelling does. The results are then displayed on the screen with the correct answer and the next question.

At the end of the game a sumary is displayed with more stats and a nice job or a recommendation to play again depending on the final score.

The user may interupt the gameplay at any time by pressing the reset button.  The reset button will return the user to the starting state of the app where they may input new cards or play again.

In this app I used:

	HTML
	CSS
	Javascript
	jQuery
	Angular.js
	Bootstrap
	Google Fonts


In the future I plan to add sound to the end game screen and the card created screens.  I want to add a topics button which would create new tables for flashcards in the database. (This would require a server reconfiguration.) I would then add a way to play from a particular topic of tables.  I want to add some animation to the answer screen that would be different depending on whether the question was answered correctly.

