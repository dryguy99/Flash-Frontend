
//var myurl = "https://immense-reaches-83300.herokuapp.com/api";
var myurl = "http://localhost:8080/api";
var mygameTemp = [];
var mydeck = [];
$('#basic').css("display", "block");
$('#cloze').css("display", "none");
$('#game').css("display", "none");
//------------------------------------------------------------

function runendGame () {
	$('#answers').css('display', 'none');
	$('#playgame').html("<h3 class='text-centered'>You've played all the cards!<br>Would you like to play again?</h3>");
	mydeck = [];
}
//------------------------------------------------------------

function randomNum()  {
	return  Math.floor(Math.random() * mygameTemp.length);
}
//------------------------------------------------------------

function runGame(gtype) {
	$('#choices').css('display', 'none');
	$('.mygame').css('display', 'block');
	var x = randomNum();
	console.log (x);
	if  (mydeck.length >= mygameTemp.length){
		runendGame();	
	} else if (mydeck.indexOf(x) === -1 && mydeck.length < mygameTemp.length) {
		if (gtype === "cloze") {
				$('#playgame').html("<h3 class='text-centered'>" + mygameTemp[x].cloze + "</h3>");
				
		} else {
			$('#playgame').html("<h3 class='text-centered'>" + mygameTemp[x].front + "</h3>");

		} 
		mydeck.push(x);
	} else {randomNum(x);}
	//runGame();
}
//------------------------------------------------------------
// get deck from server
function getItem(gtype) {
	
	console.log(gtype);
        $.ajax({
            type: "GET",
            url: myurl,
            timeout: 4000,
            data: { deck: gtype },
            success: function(data) {
                //show content
                console.log('Success!');
                console.log(data);
                
                for (i=0; i<data.length; i++){
                	console.log(data[i].front + " " + data[i].back);
                }
                mygameTemp = data;
                runGame(gtype);
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+ textStatus +', err '+err)
            }
        });
    }//getItem()

//-----------------------------------------------------------
// post item to server
function postItem(type, front, back) {
	var urlTemp = myurl + "/"+ type + "?front="+ front + "&back=" + back;
	console.log(urlTemp);
        $.ajax({
            type: "POST",
            url: urlTemp,
            timeout: 2000,
            data: { front: front, back: back },
            success: function(data) {
                //show content
                console.log('Success!')
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err)
            }
        });
    }//postItem()


$(document).on('click', '.mybtn', function () {
	event.preventDefault();
	var mychoice = $(this).val();
	console.log(mychoice);
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
		$('#choices').html('<button class="mybtn" type="submit" value="gcloze">Play with Cloze Cards</button> Choose Your Deck. <button class="mybtn" type="submit" value="gbasic">Play with Basic Cards</button>');
	}
	// play with basic cards
	if (mychoice === 'gbasic') {
		getItem('basic');
	} // play with cloze cards
	else if (mychoice === 'gcloze') {
		getItem('cloze');
	}
});
//--------------------------------------------------------
// play with flashcards


function clearBasic() {
	$("#frontb").val("");
	$("#backb").val("");
}

function clearCloze() {
	$("#frontc").val("");
	$("#backc").val("");
}

$(document).on('click', '.myform', function () {
	event.preventDefault();
	var cardType = $(this).val();
	switch (cardType){
		case "basic":
			var front = $("#frontb").val();
			var back = $("#backb").val();
			break;
		case "cloze":
			var front = $("#frontc").val();
			var back = $("#backc").val();	
	}
	
	if (front === "" || back === "") {
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

