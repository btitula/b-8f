"use strict"

// -------------------------------
// GAME STATE VARIABLES
// -------------------------------
let score = 0;              // Player score
let gameOver = false;       // Flag to track if game is over
let gameOverThreshold = 0;  // Vertical position (Y) that triggers game over when a word hits it

// List of words to spawn
let words = [
  "apple", "banana", "cherry", "date", "elderberry",
  "fig", "grape", "honeydew", "kiwi", "lemon"
]

// -------------------------------
// UTILITY FUNCTIONS
// -------------------------------

// Shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1;

    // Swap elements
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Generate a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

// -------------------------------
// WORD SPAWNING / FALLING
// -------------------------------
let i = -1; // index counter, cycles through word list

function printWords() {
  // Step 1: Pick next word (cycling through the list)
  i = (i + 1) % words.length;
  const text = words[i];
  const id = `dump-${i}`;

  // Step 2: Add the word element into the playfield
  $('.words-block').append(`<div id="${id}" class="game-words">${text}</div>`);

  // Step 3: Style the new word (random color + random horizontal position)
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5', '#F5FF33'];
  const randomColor = Math.floor(Math.random() * colors.length);
  const $block = $('.words-block');
  const $w = $(`#${id}`);
  const maxLeft = Math.max(0, $block.width() - $w.outerWidth());
  const randomX = getRandomInt(0, maxLeft);
  $w.css('left', randomX + 'px');
  $w.css('background-color', colors[randomColor]);

  // Step 4: Calculate where the bottom of the block is
  const bottom = $block.innerHeight() - $w.outerHeight();

  // Initialize gameOverThreshold only once (slightly above bottom)
  if (gameOverThreshold === 0) {
    gameOverThreshold = $block.innerHeight() - 35;
  }
  console.log(`${text} with bottom ${bottom}, gameOverThreshold ${gameOverThreshold}`)

  // Step 5: Tag metadata on the element for tracking
  $w.data('word-id', id);
  $w.data('removed', false);       // mark as false, will set to true if matched
  $w.data('word-text', text);      // store text for debugging

  // Step 6: Animate the word falling down
  $w.animate(
    { top: bottom },
    {
      duration: 10000,  // fall duration in ms
      easing: "linear", // smooth, steady fall
      step: function (now, fx) {
        // Runs on every animation frame (can debug here if needed)
      },
      complete: function () {
        const $this = $(this);

        // If this word was already matched and removed → ignore
        if ($this.data('removed') === true) {
          console.log(`Word "${$this.data('word-text')}" was matched and removed - ignoring animation complete`);
          return;
        }

        // Otherwise: this word reached the bottom
        const pos = $this.position();
        console.log(`${text} finished at top=${pos.top}, left=${pos.left}`);
        if (pos.top >= gameOverThreshold) {
          console.log(`Game over triggered by word: ${text} at position ${pos.top}, threshold ${gameOverThreshold}`);
          gameOver = true;
          $('.game-board.after').show();
        }
      }
    }
  );

  // Step 7: Keep spawning words until game ends
  if (!gameOver) {
    setTimeout(printWords, 3000); // spawn new word every 3s
  }
}

// -------------------------------
// DEBUG HELPERS
// -------------------------------

// Print all active words with position info
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
  }).get();
  console.table(rows);
}

// -------------------------------
// WORD MATCHING LOGIC
// -------------------------------

// Find the matching word on screen (closest to bottom if multiple exist)
function findBestMatch(text) {
  const q = text.trim().toLowerCase();
  console.log(`q: ${q}`)

  const $items = $('.words-block .game-words');
  debugLogWordsOnScreen();

  let $best = $();
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
  return $best;
}

// Handle player input when pressing Enter
function matchWords() {
  if (gameOver) return;
  console.log(`gameOver: ${gameOver}`)

  const inputVal = $('.input-field').val().trim().toLowerCase();
  console.log(`inputVal: ${inputVal}`)
  if (!inputVal) return;

  // Find the target word
  const $target = findBestMatch(inputVal);
  console.log(`target: ${$target.text().trim()}`)
  console.log(`target length: ${$target.length}`)

  if ($target.length) {
    // MATCH SUCCESS
    console.log("Word matched! Removing target word.");
    $target.data('removed', true);           // mark it so animate complete ignores it
    $target.stop(true, true).remove();       // stop animation & remove from DOM
    $('.input-field').val('').focus();

    score += 1;
    $('.mainscore-board .digit').text(String(score));

    // Win condition: 10 points
    if (score >= 10) {
      gameOver = true;
      $('.message-text').text('Level Complete! 🎉').show().delay(600).fadeOut();
      $('.game-board.after .game-title').text('You Win! 🎉');
      $('.game-board.after .digit').text(score);
      $('.btn.reset-game').text('Restart Game');
      $('.game-board.after').fadeIn();
    }
  } else {
    // NO MATCH
    $('.message-text').text('Wrong Word! ❌').show().delay(600).fadeOut();
    $('.input-field').val('').focus();
  }
}

// -------------------------------
// EVENT BINDINGS
// -------------------------------

// Trigger matchWords when user presses Enter
$('.input-field').on('keydown', function (e) {
  if (e.key === 'Enter') { e.preventDefault(); matchWords(); }
});

// Start game when clicking "Start"
$('.start-game').on('click', function () {
  $('.game-board.before').hide();
  $('.input-field').val('').focus();
  score = 0;
  gameOver = false;
  gameOverThreshold = 0; // Reset threshold to be recalculated
  $('.mainscore-board .digit').text('0');
  $('.game-board.after').hide();
  $('.words-block').empty();
  shuffle(words);        // randomize word order
  printWords();          // start spawning words
});