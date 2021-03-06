/*------------- constants -------------*/
var words = [ 
    'SPONGEBOB',
    'SQUIDWARD',
    'JIMMY NEUTRON',
    'COSMO',
    'WANDA',
    'TIMMY TURNER',
    'MR KRABS',
    'MRS PUFF',
    'SANDY CHEEKS',
    'DIDI PICKLES',
    'PATRICK STAR',
    'CARL WHEEZER'

];

/*------------- app's state -------------*/
var secretWord, wrongCount, guess;

/*------------- cached element references -------------*/
var $guess = $('#guess');
var $img = $('#hang-img');
var $message = $('#message');

/*------------- event listeners -------------*/
$('#letters').on('click', handleLetterClick);

$('#reset').on('click', initialize);

/*------------- functions -------------*/
initialize();

function initialize() {
    wrongCount = 0;
    secretWord = words[getRandomInt(words.length -1)];

    guess = "";
    
    for (var i = 0; i < secretWord.length; i++) {
      var currentLetter = secretWord[i];
      if (currentLetter === " ") {
          guess += " "
      } else {
          guess += "_";
      }
    };

    $('button.letter-button').prop('disabled', false);
    render();
}

function getRandomInt(max) {
    return Math.floor (Math.random() * (max + 1));
}

function render() {
    $guess.html(guess);
    $('#wrong').html(`WRONG GUESSES: ${wrongCount}`);
    $img.attr('src', 'images/img' + wrongCount + '.png')

    if (guess === secretWord) {
        $message.html("Congratulations!! You solved HangMan!");
        $message.fadeIn();
    } else if ( wrongCount === 6) {
        $message.html("Sorry! You've run out of chances.");
        $message.fadeIn();
    } else {
        $message.html("")
        $message.hide();
    }
}

function handleLetterClick (evt) {
    if (wrongCount === 6) return;

    var letter = evt.target.textContent;
    console.log(secretWord);
    if (secretWord.includes(letter)) {
        var pos = secretWord.indexOf(letter);
        while ( pos >= 0) {
            guess = guess.split('');
            guess[pos] = letter;
            guess = guess.join('');
            pos = secretWord.indexOf(letter,pos +1);
        }
    } else {
        if (evt.target.id !== "reset") {
            wrongCount++;
        }
    }
    
    $(evt.target).prop('disabled', true);
    $('#reset').prop('disabled', false);
    render();
}

