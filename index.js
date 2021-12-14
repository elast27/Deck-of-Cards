// // Import stylesheets
import './style.css';

let deck = [];
const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
const values = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];
reloadDeck();

function reloadDeck() {
  deck = [];
  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      var card = { Value: values[v], Suit: suits[s] };
      deck.push(card);
    }
    shuffle();
  }
}
document.getElementById('shuffle').addEventListener('click', shuffle, false);
document.getElementById('deal').addEventListener('click', deal, false);
document.getElementById('dealOne').addEventListener('click', dealOne, false);
document.getElementById('showDeck').addEventListener('click', showDeck, false);

function shuffle() {
  for (var i = 0; i < 3000; i++) {
    let loc1 = Math.floor(Math.random() * deck.length);
    let loc2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[loc1];
    deck[loc1] = deck[loc2];
    deck[loc2] = tmp;
  }
}

function deal() {
  let cards = document.getElementById('noCards').value;
  let players = document.getElementById('players').value;
  if (cards * players > 52) {
    document.getElementById('board').innerHTML =
      'Number of cards exceeds size of normal deck. Please change your inputs';
    return;
  } else document.getElementById('board').innerHTML = '';
  if (cards * players > deck.length) reloadDeck();
  for (var i = 0; i < players; i++) {
    let player = document.createElement('div');
    player.className = 'player';
    player.id = 'player' + i;
    document.getElementById('board').appendChild(player);
  }
  for (var i = 0; i < players; i++) {
    let player = document.getElementById('player' + i);
    player.innerHTML = `<strong>Player ${i + 1}</strong>`;
    player.className = 'row player';
    for (var j = 0; j < cards; j++) {
      let cardContainer = document.createElement('div');
      cardContainer.className = `col`;
      player.appendChild(cardContainer);
      let card = document.createElement('div');
      let selected = deck.pop();
      let icon = '';
      if (selected.Suit == 'hearts') {
        icon = '&hearts;';
        card.style.color = 'red';
      } else if (selected.Suit == 'spades') icon = '&spades;';
      else if (selected.Suit == 'diamonds') {
        icon = '&diams;';
        card.style.color = 'red';
      } else icon = '&clubs;';
      card.innerHTML = `<p>${selected.Value}${icon}</p>`;
      card.className = `card text-center`;
      cardContainer.appendChild(card);
    }
  }
}

function dealOne() {
  if (deck.length === 0) return;
  let card = document.createElement('div');
  let selected = deck.pop();
  let icon = '';
  if (selected.Suit == 'hearts') {
    icon = '&hearts;';
    card.style.color = 'red';
  } else if (selected.Suit == 'spades') icon = '&spades;';
  else if (selected.Suit == 'diamonds') {
    icon = '&diams;';
    card.style.color = 'red';
  } else icon = '&clubs;';
  card.innerHTML = `<p>${selected.Value}${icon}</p>`;
  card.className = `card text-center col-1`;
  document.getElementById('board').appendChild(card);
  window.scrollTo(0, document.body.scrollHeight);
}

function showDeck() {
  if (deck.length === 0) return;
  while (deck.length > 0) {
    dealOne();
  }
  window.scrollTo(0, document.body.scrollHeight);
}
