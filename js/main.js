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

/*------------- event listeners -------------*/
$('#letters').on('click', 'button', handleLetterClick);

/*------------- functions -------------*/
resetGame();

function resetGame() {
    wrongCount = 0;
    secretWord = words[getRandomInt(words.length -1)];
    guess = '_'.repeat(secretWord.length);
    $('button.letter-button').prop('disabled', false);
    render();
}

function getRandomInt(max) {
    return Math.floor (Math.random() * (max + 1));
}


function render() {
    $guess.html(guess);
    $('#wrong').html(wrongCount);
    $img.attr('src', 'images/img' + wrongCount + '.png')
}

function handleLetterClick (evt) {
    if (evt.target.id === "reset") {
        resetGame();
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
        $(evt.target).prop('disabled', true);
    }
    render ();
}

function setTimeout() {
    //when spaces are all filled
}