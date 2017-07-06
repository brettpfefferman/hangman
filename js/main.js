/*------------- constants -------------*/
var words = [ 
    'SPONGEBOB',
    'SQUIDWARD',
    'JIMMY NEUTRON',
    'COSMO',
    'WANDA',
    'TIMMY TURNER',
    'CHUCKIE FINSTER',
    'ANGELICA PICKLES',
    'DIDI PICKLES',
    'CARL WHEEZER'

];
var secretWord, wrongCount, guess;

/*------------- app's state -------------*/
//source of secret words 
//wrong count (initialize to zero; inc w/ each wrong guess)
//holds the player's guess so far. initialize to be a string of '_''s same as the # as length of secret word
// when guess is = to secret word, we have a winner

/*------------- cached element references -------------*/
var $guess = $('#guess');
var $img = $('#hang-img');
var $message = $('#message');

/*------------- event listeners -------------*/
$('#letters').on('click', handleLetterClick);

$('#reset').on('click', resetGame);

/*------------- functions -------------*/
resetGame();

function resetGame() {
    wrongCount = 0;
    secretWord = words[getRandomInt(words.length -1)];
    guess = '_'.repeat(secretWord.length);
    // guess = "";
    // for ( var i = 0; i < secretWord.length; i++) {
    //     var word = secretWord.split();
    //     if (word[i] !== ' ') {
    //         guess += '_'
    //     } else {
    //         guess += ' ';
    //     }
    // }
    $('button.letter-button').prop('disabled', false);
    render();
}

function getRandomInt(max) {
    return Math.floor (Math.random() * (max + 1));
}


function render() {
    $guess.html(guess);
    console.log(wrongCount);
    $('#wrong').html(wrongCount);
    $img.attr('src', 'images/img' + wrongCount + '.png')
    
    console.log(guess);

    if (guess === secretWord) {
        $message.html("Congratulations!! You solved HangMan!");
    } else if ( wrongCount === 6) {
        $message.html("Sorry! You've run out of chances");
    } else {
        $message.html("")
    }
}

function handleLetterClick (evt) {
    if (wrongCount === 6) {
        // $().innerHTML = ("Sucks to suck. You lose.")
        return;
    } else {
        var letter = evt.target.textContent;
        console.log(letter);
        console.log(secretWord);
        if (secretWord.includes(letter)) {
            var pos = secretWord.indexOf(letter);
            while ( pos >= 0) {
                guess = guess.split('');
                guess[pos] = letter;
                guess = guess.join('');
                console.log(guess);
                pos = secretWord.indexOf(letter,pos +1);
            }
    } else {
        wrongCount++;
        }
    }
    if (evt.target.id === "reset") {
        return;
    } else {
        $(evt.target).prop('disabled', true);
        render();
    }
}

