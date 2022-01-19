const URI_BASE = 'http://deckofcardsapi.com/api/deck/';
const URI_NEW_DECK = 'new/shuffle/?deck_count=';
const URI_DRAW_CARD = '/draw/?count=';

let DECK_ID, CARDS_REMAINING;
let DECK_AMOUNT = 1;
let CARD_AMOUNT = 1;

const btnCard = document.querySelector('[data-button="0"]');
const btnDeck = document.querySelector('[data-button="1"]');
const cardDiv = document.getElementById('card');

class Card{
	constructor(image, value, suit, code) {
		this.image = image;
		this.value = value;
		this.suit = suit;
		this.code = code;
	}
	getHtmlNode() {
		let mainDiv = document.createElement('div');
		mainDiv.classList.add('col');
		mainDiv.classList.add('card');
		mainDiv.classList.add('d-flex');
		mainDiv.classList.add('mx-auto');
		mainDiv.style = 'width: 18rem';

		let img = document.createElement('img');
		img.src = this.image;
		img.classList.add('card-img-top');
		img.alt = this.code;

		let bodyDiv = document.createElement('div');
		bodyDiv.classList.add('card-body');

		let title = document.createElement('h5');
		title.classList.add('card-title');
		title.classList.add('text-center');
		title.innerHTML = this.value + ' of ' + this.suit;

		bodyDiv.appendChild(title);

		mainDiv.appendChild(img);
		mainDiv.appendChild(bodyDiv);

		return mainDiv;
	}
}

const onDeckButtonPress = e => {
	console.log('beep boop');
	const URI = URI_BASE + URI_NEW_DECK + DECK_AMOUNT;
	fetch(URI)
		.then(res => res.json())
		.then(data => {
			if (data.success) {
				DECK_ID = data.deck_id;
				CARDS_REMAINING = data.remaining;
				btnCard.classList.remove('disabled');
			}
		}).catch(err => console.log(err));
	cardDiv.innerHTML = '';
};

const onCardButtonPress = e => {
	console.log('boop boop');
	if (!CARDS_REMAINING) {
		//Do nothing, out of cards OR no cards gathered
		btnCard.classList.add('border');
		btnCard.classList.add('border-warning');
	}
	else {
		//THERE ARE CARDS!
		btnCard.classList.remove('border');
		btnCard.classList.remove('border-warning');
		const URI = URI_BASE + DECK_ID + URI_DRAW_CARD + CARD_AMOUNT;
		fetch(URI)
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					data.cards.forEach(c => {
						cardDiv.appendChild((new Card(c.image, c.value, c.suit, c.code)).getHtmlNode());
						CARDS_REMAINING = data.remaining;
					});
				}
			}).catch(err => console.log(err));
		if (!CARDS_REMAINING) {
			btnCard.classList.add('disabled');
		}
	}
};

btnDeck.addEventListener('click', onDeckButtonPress);
btnCard.addEventListener('click', onCardButtonPress);