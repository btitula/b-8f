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

// Start game
// $('.start-game').on('click', function () {
//   $('.game-board.before').hide()
//   shuffle(words)
//   printWords()
// })


// Generate random position
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

// Print words on screen
let i = -1;
function printWords() {
  i = (i + 1) % words.length;

  // let appendWord = `
  // <div id="dump-${i}" class="game-words">
  //   ${words[i]}
  // </div>`

  // $('.words-block').append(appendWord);

  const idx = i;                  // capture index for this spawn
  const text = words[idx];        // capture text for logs

  const id = `dump-${idx}`;

  $('.words-block').append(`<div id="${id}" class="game-words">${text}</div>`);
  // setTimeout(printWords, 1000)

  // Random background color words
  let colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5', '#F5FF33']
  let randomColor =   Math.floor(Math.random() * colors.length);
  // $(`#dump-${i}`).css('background-color', colors[randomColor]);

  // Random X position
  // let randomX = getRandomInt(-50, 200);
  // console.log(`${words[i]} with randomX ${randomX}`)
  // $(`#dump-${i}`).css('left', randomX);

  const $block = $('.words-block');
  const $w = $(`#${id}`);
  const maxLeft = Math.max(0, $block.width() - $w.outerWidth());
  const randomX = getRandomInt(0, maxLeft);
  $w.css('left', randomX + 'px');

  // fall to numeric bottom (safer than '100%')
  const bottom = $block.innerHeight() - $w.outerHeight();
  console.log(`${text} with bottom ${bottom}`)
  // $(`#dump-${i}`).animate({ top: '100%' }, 8000, function() {
  //   let position = $('.game-words').position();
  //   console.log(`${words[i]} with position.top ${position.top}`)
  //   if (position.top > 270) {
  //     $('.game-board.after').show();
  //   }
  // })

  $w.animate({ top: bottom }, 8000, function () {
    // use the element that finished
    const $self = $(this);
    const pos = $self.position();           // <-- this element’s position
    console.log(`${text} with position top=${pos.top}, left=${$self.position().left}`);

    if (pos.top >= 100) { /* game over */ 
      $('.game-board.after').show();
    }
  });

  setTimeout(printWords, 1000);
}
//
// Match input with words
// let score = 0;
// let gameOver = false;        
/*
function matchWords() {
  if (gameOver) return;

  const inputVal = $('.input-field').val().trim().toLowerCase();
  if (!inputVal) return;

  const $first = $('.words-block .game-words').first();
  if ($first.length === 0) return;
  const target = $first.text().trim().toLowerCase();

  if (inputVal === target) {
    // correct
    $first.stop(true, true).remove();
    $('.input-field').val('');

    score += 1;
    $('.mainscore-board .digit').text(String(score));

    if (score >= 10) {
      gameOver = true;
      // clearTimeout(spawnTimer); // if you stored your spawner id
      $('.message-text').text('Level Complete! 🎉').show().delay(600).fadeOut();
      $('.game-board.after .game-title').text('You Win! 🎉');
      $('.game-board.after .digit').text(score);
      $('.btn.reset-game').text('Restart Game');
      $('.game-board.after').fadeIn();
    }
  } else {
    // wrong
    $('.message-text').text('Wrong Word! ❌').show().delay(600).fadeOut();
    $('.input-field').val('');
    // $('.game-board.after .digit').text(score);
  }

  // let inputVal = $('.input-field').val();
  // let wordsOnScreen = $('.game-words:first-child').text();

  // if (inputVal === wordsOnScreen) {
  //   $('.input-field').val("")
  //   $('.game-words:first-child').remove();
  //   score += 1;
  //   $('.score').text(`Score: ${score}`);

  //   let finalScore = $('.mainscore-board .digit').text()
  //   if (finalScore > 10) {
  //     $('.message-text').text('Level Complete! 🎉').show().delay(500).fadeOut();

  //     setInterval(function() {
  //       $('.game-board.after').show().fadeIn();
  //       $('.game-board.after .game-title').text('You Win! 🎉')
  //       $('.btn.reset-game').text('Restart Game')
  //     }, 1000)
  //   } else {
  //     $('.message-text').text('Wrong Word! ❌').show().delay(500).fadeOut();
  //     let currentScore = $('.mainscore-board .digit').text()
  //     console.log(`${currentScore} currentScore`)
  //     $('input-field').val("")
  //   }
  // }
}
*/

// bind ONCE, not inside matchWords()
// $('.input-field').on('keydown', function (e) {
//   if (e.key === 'Enter') matchWords();
// });


// pick the word closest to the bottom (largest top)
function getFrontWord() {
  const $items = $('.words-block .game-words');
  if ($items.length === 0) return $();

  let $best = $();
  let bestTop = -Infinity;

  $items.each(function () {
    const top = $(this).position().top || 0;
    if (top > bestTop) { bestTop = top; $best = $(this); }
  });

  return $best;
}

let score = 0;
let gameOver = false; // set to true when you end the game

function matchWords() {
  if (gameOver) return;

  const inputVal = $('.input-field').val().trim().toLowerCase();
  if (!inputVal) return;

  // STRICT mode: must match the front-most word
  const STRICT_QUEUE = true;

  let $target = STRICT_QUEUE ? getFrontWord() : $();
  let targetText = STRICT_QUEUE && $target.length
    ? $target.text().trim().toLowerCase()
    : '';

  // If not strict, try to find any word with the typed text
  if (!STRICT_QUEUE) {
    $target = $('.words-block .game-words').filter(function () {
      return $(this).text().trim().toLowerCase() === inputVal;
    }).first();
    targetText = $target.length ? inputVal : '';
  }

  if ($target.length === 0) return; // nothing to match yet

  if (inputVal === targetText) {
    // correct
    $target.stop(true, true).remove();
    $('.input-field').val('');

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
    $('.input-field').val('');
  }
}

// bind once
$('.input-field').on('keydown', function (e) {
  if (e.key === 'Enter') { e.preventDefault(); matchWords(); }
});

// good UX: focus the input when starting
// $('.start-game').on('click', function () {
//   $('.input-field').val('').focus();
// });

$('.start-game').on('click', function () {
  $('.game-board.before').hide()
  $('.input-field').val('').focus();
  shuffle(words)
  printWords()
})
