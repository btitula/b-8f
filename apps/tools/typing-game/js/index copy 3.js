"use strict"

let score = 0;
let gameOver = false;
let gameOverThreshold = 0; // Will be set dynamically

let words = [
  "apple", "banana", "cherry", "date", "elderberry",
  "fig", "grape", "honeydew", "kiwi", "lemon"]

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1;

    // Swap the elements
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Generate random position
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

// Print words on screen
let i = -1;
function printWords() {
  i = (i + 1) % words.length;

  const idx = i;
  const text = words[idx];
  const id = `dump-${idx}`;

  $('.words-block').append(`<div id="${id}" class="game-words">${text}</div>`);

  // Random background color words
  let colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5', '#F5FF33']
  let randomColor = Math.floor(Math.random() * colors.length);

  // Random X position
  const $block = $('.words-block');
  const $w = $(`#${id}`);
  const maxLeft = Math.max(0, $block.width() - $w.outerWidth());
  const randomX = getRandomInt(0, maxLeft);
  $w.css('left', randomX + 'px');
  $w.css('background-color', colors[randomColor]);


  // fall to numeric bottom (safer than '100%')
  const bottom = $block.innerHeight() - $w.outerHeight();
  // Only update the threshold once
  if (gameOverThreshold === 0) {
    gameOverThreshold = $block.innerHeight() - 35; // Set threshold slightly above bottom
  }
  console.log(`${text} with bottom ${bottom}, gameOverThreshold ${gameOverThreshold}`)

  $w.animate(
    { top: bottom },
    {
      duration: 10000,
      easing: "linear",
      step: function (now, fx) {
        // `now` = current value of the animated property (here: top)
        // `this` = the element being animated
        const $el = $(this);
        // console.log(`${text} at top=${now}, left=${$el.position().left}`);
      },
      complete: function () {
        const pos = $(this).position();
        console.log(`${text} finished at top=${pos.top}, left=${pos.left}`);
        if (pos.top >= gameOverThreshold) { /* game over */
          console.log(`Game over triggered by word: ${text} at position ${pos.top}, threshold ${gameOverThreshold}`);
          gameOver = true;
          $('.game-board.after').show();
        }
      }
    }
  );

  if (!gameOver) {
    setTimeout(printWords, 3000); // Print a new word every 3 seconds
  }
}

function debugLogWordsOnScreen() {
  const rows = $('.words-block .game-words').map(function () {
    const $el = $(this);
    const p = $el.position() || { top: 0, left: 0 };
    return {
      id: this.id,
      text: $el.text().trim(),
      top: Math.round(p.top),
      left: Math.round(p.left)
    };
  }).get(); // convert jQuery collection -> plain array

  console.table(rows); // nice tabular output
}

// Find the on-screen word equal to `text` and return the one closest to the bottom.
function findBestMatch(text) {
  const q = text.trim().toLowerCase();
  console.log(`q: ${q}`)

  // Get all falling word elements currently on screen
  const $items = $('.words-block .game-words');
  debugLogWordsOnScreen()
  let $best = $();

  /*
  Infinity and -Infinity are special numeric values built into JavaScript.
    •	Infinity is larger than any real number.
    •	-Infinity is smaller than any real number.

  console.log( 100 < Infinity );  // true
  console.log( -100 > -Infinity ); // true
  */
  let bestTop = -Infinity;

  $items.each(function () {
    const $el = $(this);
    if ($el.text().trim().toLowerCase() === q) {
      const top = $el.position().top || 0;
      if (top > bestTop) { bestTop = top; $best = $el; }
    }
  });

  console.table($items.get().map(el => ({
    id: el.id,
    text: el.textContent.trim(),
    top: $(el).position().top
  })));


  console.log(`bestTop and best match: ${bestTop} and ${$best.text().trim()}`)
  return $best; // empty jQuery object => no match
}



function matchWords() {
  if (gameOver) return;
  console.log(`gameOver: ${gameOver}`)

  const inputVal = $('.input-field').val().trim().toLowerCase();
  console.log(`inputVal: ${inputVal}`)
  if (!inputVal) return;

  // Accept ANY matching word on screen (prefer the one nearest the bottom)
  const $target = findBestMatch(inputVal);
  console.log(`target: ${$target.text().trim()}`)
  console.log(`target length: ${$target.length}`)


  if ($target.length) {
    // correct
    // Stop all animations on the target and remove it
    $target.stop(true, true).remove();
    $('.input-field').val('').focus();

    score += 1;
    $('.mainscore-board .digit').text(String(score));

    if (score >= 10) {
      gameOver = true;
      $('.message-text').text('Level Complete! 🎉').show().delay(600).fadeOut();
      $('.game-board.after .game-title').text('You Win! 🎉');
      $('.game-board.after .digit').text(score);
      $('.btn.reset-game').text('Restart Game');
      $('.game-board.after').fadeIn();
    }
  } else {
    // wrong
    $('.message-text').text('Wrong Word! ❌').show().delay(600).fadeOut();
    $('.input-field').val('').focus();
  }
}

$('.input-field').on('keydown', function (e) {
  if (e.key === 'Enter') { e.preventDefault(); matchWords(); }
});

$('.start-game').on('click', function () {
  $('.game-board.before').hide()
  $('.input-field').val('').focus();
  score = 0;
  gameOver = false;
  $('.mainscore-board .digit').text('0');
  $('.game-board.after').hide();
  $('.words-block').empty();
  shuffle(words)
  printWords()
})
