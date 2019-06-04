const emojiListBlock  = document.querySelector('.elements-list');
const startGameButton = document.getElementById('start-game');
const restGameButton  = document.getElementById('rest-game');
const gameBlock       = document.getElementById('game-block');
const matched         = document.getElementById('matched');
const total           = document.getElementById('total');
const moves           = document.getElementById('moves');
const modal           = document.querySelector('.modal');

const Game = function() {
    this.start = function() {

        startGameButton.classList.add('disabled');
        restGameButton.classList.remove('disabled');
        emojiListBlock.classList.remove('disabled');

        const emojis = document.querySelectorAll('.emoji');

        emojis.forEach((emoji) => {
            emoji.classList.toggle('flipped');
            emoji.classList.toggle('disabled');
        });

        setTimeout(() => {
            emojis.forEach((emoji) => {
                emoji.classList.toggle('flipped');
                emoji.classList.toggle('disabled');
            });
        }, 2000);
    };

    this.rest = function() {
        modal.classList.remove('show');
        this.player.init();
        this.shuffleEmojis();
        this.addEmojis();
    };

    this.incMatched = function() {
        matched.textContent = ++this.player.hasMatched;
    };

    this.incMoves = function() {
        moves.textContent = ++this.player.moves;

    };

    this.shuffleEmojis = function() {
        for( let i = this.emojis.length-1; i >= 0; i-- ) {
            let randomIndex = Math.floor(Math.random()*(i+1));
            let itemAtIndex = this.emojis[randomIndex];
            this.emojis[randomIndex] = this.emojis[i];
            this.emojis[i] = itemAtIndex;
        }
    };

    this.addEmojis = function() {
        emojiListBlock.innerHTML = '';
        this.emojis.forEach((emoji) => {
            let element = document.createElement('li');
            element.classList.add('element');

            let emojiEl = document.createElement('div');
            emojiEl.setAttribute('data-emoji', emoji);
            emojiEl.classList.add('emoji');

            let front = document.createElement('span');
            front.classList.add('front');

            let back = document.createElement('span');
            back.classList.add('back');

            let img = document.createElement('img');
            img.setAttribute('src', `images/${emoji}.png`);

            back.appendChild(img);

            emojiEl.appendChild(front);
            emojiEl.appendChild(back);

            element.appendChild(emojiEl);

            emojiListBlock.appendChild(element);
        });
    };

    this.compareEmoji = function() {
        if(this.player.currentOpened[0] === this.player.currentOpened[1]) {
            this.player.matchedEmoji = this.player.matchedEmoji.concat(this.player.currentOpened);
            this.incMatched();
        } else {
            let emojis = document.querySelectorAll('.flipped');
            emojis.forEach((emoji) => {
                if(!this.player.matchedEmoji.includes(emoji.getAttribute('data-emoji'))) {
                    emoji.classList.toggle('flipped');
                    emoji.classList.toggle('disabled');
                }
            });
        }
        this.player.currentOpened = [];
        this.incMoves();
        emojiListBlock.classList.remove('disabled');

        this.player.isWinner(this.emojis.length);
    };

    this.setupEvents = function() {
        startGameButton.addEventListener('click', () => this.start());

        restGameButton.addEventListener('click', () => this.rest());

        modal.addEventListener('click', () => this.rest());

        gameBlock.addEventListener('click', (e) => {
            if (e.target && e.target.nodeName === 'SPAN') {
                let emoji = e.target.parentNode;
                this.player.flipEmoji(emoji);
                if(this.player.currentOpened.length === 2) {
                    emojiListBlock.classList.add('disabled');
                    setTimeout(() => {
                        this.compareEmoji();
                    }, 1000);
                }
            }
        });
    };

    this.init = function(player) {
        this.emojis = ['cool', 'cry', 'flushed', 'in-love', 'kiss', 'mask', 'sleeping', 'smiling', 'tired', 'tongue', 'cool', 'cry', 'flushed', 'in-love', 'kiss', 'mask', 'sleeping', 'smiling', 'tired', 'tongue'];
        this.player = player;
        this.player.init();
        this.shuffleEmojis();
        this.addEmojis();
        this.setupEvents();
    };

    this.emojis = [];
    this.player = null;

};

const Player = function() {
    this.init = function() {
        this.matchedEmoji  = [];
        this.currentOpened = [];
        this.hasMatched    = 0;
        this.moves         = 0;

        moves.textContent   = this.moves;
        matched.textContent = this.hasMatched;

        startGameButton.classList.remove('disabled');
        restGameButton.classList.add('disabled');
        emojiListBlock.classList.add('disabled');
    };

    this.isWinner = function (totalEmojis) {
        if(this.matchedEmoji.length === totalEmojis) {
            modal.classList.add('show');
        }
    };

    this.flipEmoji = function(emoji) {
        emoji.classList.toggle('flipped');
        emoji.classList.toggle('disabled');

        this.currentOpened = this.currentOpened.concat(emoji.getAttribute('data-emoji'));
    };

    this.matchedEmoji  = [];
    this.currentOpened = [];
    this.hasMatched    = 0;
    this.moves         = 0;
};

const game   = new Game();
const player = new Player();

game.init(player);