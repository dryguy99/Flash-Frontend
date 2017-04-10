
var myurl = "https://immense-reaches-83300.herokuapp.com/api";
//var myurl = "http://localhost:8080/api";
var mygameTemp = [];
var mydeck = [];
var wincount = 0;
var losscount = 0;
var response = false;
var qCount = 0;
var gType = "";
$('#basic').css("display", "block");
$('#cloze').css("display", "none");
$('#game').css("display", "none");
//------------------------------------------------------------

function runendGame () {
	$('#answers').css('display', 'none');
	$('#playgame').html("<h3 class='text-centered endsaying1'>You've played all the cards!<br><span id='purple'>Choose a Play button Above</span><br><span id='brown'>OR RESET Below to go back to the machine.</span></h3>");
	var percentR = Math.round(wincount / mygameTemp.length * 100); // find correct answer percentage & set sayings
		if (percentR > 85) {
				var endsaying = "FABULOUS!<br>You know your US History!!!";
			}
			else if (percentR > 61)	{
				endsaying = "Not bad...<br> Maybe you should use the cards again?";
			}
			else { 
				endsaying = "I beleive you need to practice some more...<br><span id='purple'>(click a purple button above)</span><br>";
			}
	$('#success').prepend("<span class='endsaying'>GAME OVER!</span>");
	$('#success').prepend("<span class='endsaying'>" + endsaying + "</span><br>" );
	$('#success').prepend("<span class='endsaying'>You corrctly answered " + percentR + " % of the questions.</span><br>");
	$('#choices').css('display', 'block');
	gType = "";
	mydeck = [];
	wincount = 0;
	losscount = 0;
	response = false;
	qCount = 0;
}
//------------------------------------------------------------

function randomNum()  {
	return  Math.floor(Math.random() * mygameTemp.length);
}
//------------------------------------------------------------

function runGame() {
	$('#choices').css('display', 'none');
	$('.mygame').css('display', 'block');
	var x = randomNum();
	if (mydeck.length >= mygameTemp.length) {
		runendGame();
	} else {
		while (mydeck.indexOf(x) != -1) {
			x = randomNum();
		}
		mydeck.push(x);
		qCount--;
		if (gType === "cloze") {
				$('#playgame').html("<h3 class='game text-centered'>" + mygameTemp[x].cloze + "</h3>");
				
		} else {
			$('#playgame').html("<h3 class='game text-centered'>" + mygameTemp[x].front + "</h3>");
		}
	}
}
//------------------------------------------------------------
// get deck from server
function getItem(utype) {
	
        $.ajax({
            type: "GET",
            url: myurl,
            timeout: 4000,
            data: { deck: utype },
            success: function(data) {
                //show content
                //console.log('Success!');
                // for (i=0; i<data.length; i++){
                // 	console.log(data[i].front + " " + data[i].back);
                // }
                mygameTemp = data;
                qCount = mygameTemp.length;
                runGame(utype);
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+ textStatus +', err '+err);
                if (err === "timeout") {
                	console.log("waiting for server...");
                	getItem(utype);
                }
                response = true;
                $('.response').css('display', 'block');
                $('.response').html("<h3 class='text-center'>Status: " + textStatus + ", Error: "+ err + "<br> Please contact System Admin.</h3>");
            }
        });
    }//getItem()

//-----------------------------------------------------------
// post item to server
function postItem(type, front, back) {
	var urlTemp = myurl + "/"+ type + "?front="+ front + "&back=" + back;
        $.ajax({
            type: "POST",
            url: urlTemp,
            timeout: 2000,
            data: { front: front, back: back },
            success: function(data) {
                //show content
                //console.log(JSON.stringify(data));
                response = true;
                $('.response').css('display', 'block');
                $('.response').html("<h3 class='text-center'>Success: Card Created!</h3>");
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err);
                if (err === "timeout") {
                	console.log("waiting for server...");
                	postItem(type, front, back);
                }
                response = true;
                $('.response').css('display', 'block');
                $('.response').html("<h3 class='text-center'>Status: " + textStatus + ", Error: "+ err + "<br> Please contact System Admin.</h3>");
            }
        });
    }//postItem()
function prepareGame () {
	$('#choices').css("display", "none");
	$('.setup').css("display", "none");
	$('.mygame').css("display", "inline");
	mydeck = [];
	mygameTemp = [];
	wincount = 0;
	losscount = 0;
	qCount = 0;
}
function resetmakeCards () {
	$('#choices').css("display", "none");
	$('#success').css("display", "none");
	$('#stats').css("display", "none");
	$('.setup').css("display", "block");
	$('.mygame').css("display", "none");
	$('#basicbtn').attr("data-selected", "true");
	$('#gamebtn').attr("data-selected", "false");
	$('#cloze').css("display", "none");
	mydeck = [];
	mygameTemp = [];
	wincount = 0;
	losscount = 0;
	response = false;
	qCount = 0;
	gType = "";
}

//--------------------------------------------------------
// clear the Basic Flashcard fields
function clearBasic() {
	$("#frontb").val("");
	$("#backb").val("");
}
//--------------------------------------------------------
// clear the Cloze Flashcard fields
function clearCloze() {
	$("#frontc").val("");
	$("#backc").val("");
}
//--------------------------------------------------------
// clear the Answer Game field
function clearAnswer() {
	$("#myans").val("");
}
//--------------------------------------------------------
// set interval timer
function setTimer() {
// future development, set up a timer to display a victory or fail animation
}

//--------------------------------------------------------
function mySuccess () {
	$('#success').css('display', 'block');
	$('#stats').css('display', 'block');
	$('#success').html("<h3 class='game text-center'> Correct! : \n" + mygameTemp[mydeck[mydeck.length-1]].back + "</h3>");
	setTimer();
	wincount++;
	$('#stats').html("<h3 class='game text-center'>Correct: " + wincount + " - Incorrect: " + losscount + "</h3>");
	$('#stats').append("<h3 class='game text-center'>There are " + qCount + " questions remaining.</h3>");
	runGame();
}
//--------------------------------------------------------
function myFail () {
	$('#success').css('display', 'block');
	$('#stats').css('display', 'block');
	$('#success').html("<h3 class='game text-center'> SORRY, the correct answer is : \n" + mygameTemp[mydeck[mydeck.length-1]].back + "</h3>");
	setTimer();
	losscount++;
	$('#stats').html("<h3 class='game text-center'>Correct: " + wincount + " - Incorrect: " + losscount + "</h3>");
	$('#stats').append("<h3 class='game text-center'>There are " + qCount + " questions remaining.</h3>");
	runGame();
}
//--------------------------------------------------------
// check the answer against the back of the card
function checkAnswer(answer) {
	var check = answer.toLowerCase();
	clearAnswer();
	var theAnswer = mygameTemp[mydeck[mydeck.length-1]].back.toLowerCase();
	if (theAnswer === check || theAnswer.includes(check)) {
		mySuccess();
	} else { myFail(); }
}

//--------------------------------------------------------
// once document is loaded set listners and run program
$(document).ready(function(){
	//--------------------------------------------------------
	// set onclick event for answer and rest buttons
	$(document).on('click', '.ans', function () {
		event.preventDefault();
		var btn = $(this).val().trim();
		switch (btn) {
			case "answer":
				var answer = $('#myans').val().trim();
				if (answer.length > 2) {
					$('#basicerror1').css('display', 'none');
					checkAnswer(answer); 
				} else {
					$('#basicerror1').css('display', 'block');
				}
				break;
			case "reset":
				resetmakeCards();
				break;
		}
	});
	//--------------------------------------------------------
	// set onclick event for submit Flashcard button and create cards
	$(document).on('click', '.myform', function () {
		event.preventDefault();
		var cardType = $(this).val();
		switch (cardType){
			case "basic":
				var front = $("#frontb").val().trim();
				var back = $("#backb").val().trim();
				break;
			case "cloze":
				var front = $("#frontc").val().trim();
				var back = $("#backc").val().trim();	
		}
		
		if (front === "" || back === "" || front.length > 128 || back.length > 50 || back.length < 3) {
			if (cardType === "basic") {
				$('#basicerror').css("display", "block");
			} else {
				$('#clozeerror').css("display", "block");
				$('#clozeerror').html('Please complete both fields and resubmit.');
			}
		} else if (cardType === "cloze" && !(front.includes(back))) {
			$('#clozeerror').css("display", "block");
			$(clozeerror).html("The back needs to contain a phrase from the front.<br> Please check your spelling and capitalization and resubmit.");
		} else{
			$('#basicerror').css("display", "none");
			$('#clozeerror').css("display", "none");
			clearBasic();
			clearCloze();
			postItem(cardType, front, back);
		}	
	    
	});
	//--------------------------------------------------------
	// turn off sussess or error response from server
	$("input").keyup(function(){
		if (response === true) {
			response = false;
	    	$('.response').css('display', 'none');
	    }
	});
	//--------------------------------------------------------
	// set onclick event for 3 main function buttons (basic, cloze, playgame)
	// and check to see which game the user wants to play
	$(document).on('click', '.mybtn', function () {
		event.preventDefault();
		var mychoice = $(this).val();
		var myid = "#" + mychoice;
		var isSelected = $(this).attr("data-selected");
		
		if ((isSelected === "false") && (mychoice != 'gcloze') && (mychoice != 'gbasic')) {
			
			$(this).attr("data-selected", "true");
			$(myid).css("display", "block");
			$(this).siblings(".mybtn").attr("data-selected", "false");
			$(myid).siblings().css("display", "none");
			$("#mybutton").css("display", "block");
		}

		if (mychoice === 'game') {
			$('#choices').css("display", "block");
			$('#choices').html('<button class="mybtn" type="submit" value="gcloze">Play with Cloze Cards</button> Choose Your Deck. <button class="mybtn" type="submit" value="gbasic">Play with Basic Cards</button>');
		}
		// play with basic cards
		if (mychoice === 'gbasic') {
			gType = 'basic';
			prepareGame();
			$('#playgame').html("<h3>waiting for server...</h3>");
			getItem(gType);
		} // play with cloze cards
		else if (mychoice === 'gcloze') {
			gType = 'cloze';
			prepareGame();
			$('#playgame').html("<h3>waiting for server...</h3>");
			getItem(gType);
		}
	});

}); // end program
