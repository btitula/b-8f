"use strict"

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
  console.log(`${text} with bottom ${bottom}`)

  $w.animate({ top: bottom }, 8000, function () {
    const $self = $(this);
    const pos = $self.position();
    console.log(`${text} with position top=${pos.top}, left=${$self.position().left}`);

    if (pos.top >= 100) { /* game over */
      $('.game-board.after').show();
    }
  });

  setTimeout(printWords, 1000);
}

// Find the on-screen word equal to `text` and return the one closest to the bottom.
function findBestMatch(text) {
  const q = text.trim().toLowerCase();

  // Get all falling word elements currently on screen
  const $items = $('.words-block .game-words');
  console.log(`${$items} items on screen`);

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

  return $best; // empty jQuery object => no match
}

let score = 0;
let gameOver = false;

function matchWords() {
  if (gameOver) return;

  const inputVal = $('.input-field').val().trim().toLowerCase();
  if (!inputVal) return;

  // Accept ANY matching word on screen (prefer the one nearest the bottom)
  const $target = findBestMatch(inputVal);

  if ($target.length) {
    // correct
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
  shuffle(words)
  printWords()
})
