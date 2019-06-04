(() => {
    const emojiArray = ['cool', 'cry', 'flushed', 'in-love', 'kiss', 'mask', 'sleeping', 'smiling', 'tired', 'tongue', 'cool', 'cry', 'flushed', 'in-love', 'kiss', 'mask', 'sleeping', 'smiling', 'tired', 'tongue'];

    let matchedEmoji = [];
    let openedEmoji = [];

    let matched = 0;
    let moves = 0;

    const initGame = () => {
        const emojis = shuffleEmojis(emojiArray);
        addEmoji(emojis);
        initEvents();
    };

    const addEmoji = (emojis) => {
        const emojiListBlock = document.querySelector('.elements-list');

        emojis.forEach((emoji) => {
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

    const startGame = () => {
        restConfig();

        let emojis = document.querySelectorAll('.emoji');

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

    const restGame = () => {
        restConfig();

        matchedEmoji = [];
        openedEmoji = [];
        document.querySelector('.elements-list').innerHTML = '';

        document.getElementById('winner').classList.remove('show');
        const emojis = shuffleEmojis(emojiArray);
        addEmoji(emojis);
    };

    const initEvents = () => {
        const startGameButton = document.getElementById('start-game');
        startGameButton.addEventListener('click', () => startGame());

        const restGameButton = document.getElementById('rest-game');
        restGameButton.addEventListener('click', () => restGame());

        const modal = document.getElementById('winner');
        modal.addEventListener('click', () => restGame());

        const game = document.getElementById('game-block');

        game.addEventListener('click', (e) => {
            if (e.target && e.target.nodeName === 'SPAN') {
                let emoji = e.target.parentNode;
                flipEmoji(emoji);
            }
        });
    };

    const flipEmoji = (emoji) => {
        emoji.classList.toggle('flipped');
        emoji.classList.toggle('disabled');

        openedEmoji = openedEmoji.concat(emoji.getAttribute('data-emoji'));
        if(openedEmoji.length === 2) {
            document.querySelector('.elements-list').classList.add('disabled');
            setTimeout(() => {
                compareEmoji();
            }, 1000);
        }
    };

    const shuffleEmojis = (emojis) => {
        let shuffled = [...emojis];
        for( let i = shuffled.length-1; i >= 0; i-- ) {
            let randomIndex = Math.floor(Math.random()*(i+1));
            let itemAtIndex = shuffled[randomIndex];
            shuffled[randomIndex] = shuffled[i];
            shuffled[i] = itemAtIndex;
        }
        return shuffled;
    };

    const compareEmoji = () => {
        if(openedEmoji[0] === openedEmoji[1]) {
            matchedEmoji = matchedEmoji.concat(openedEmoji);
            console.log(matchedEmoji.length, emojiArray.length);
            incMatched();
        } else {
            let emojis = document.querySelectorAll('.flipped');
            emojis.forEach((emoji) => {
                if(!matchedEmoji.includes(emoji.getAttribute('data-emoji'))) {
                    emoji.classList.toggle('flipped');
                    emoji.classList.toggle('disabled');
                }
            });
        }
        openedEmoji = [];
        incTries();
        document.querySelector('.elements-list').classList.remove('disabled');

        isWinner();
    }

    const restConfig = () => {
        document.getElementById('start-game').classList.toggle('disabled');
        document.getElementById('rest-game').classList.toggle('disabled');
        document.querySelector('.elements-list').classList.toggle('disabled');
        document.getElementById('matched').textContent = 0;
        document.getElementById('moves').textContent = 0;

        matched = 0;
        moves = 0;
    }

    const incMatched = () => {
        document.getElementById('matched').textContent = ++matched;

    }

    const incTries = () => {
        document.getElementById('moves').textContent = ++moves;
    }

    const isWinner = () => {
        if(matchedEmoji.length === emojiArray.length) {
            document.getElementById('winner').classList.add('show');
        }
    }

    initGame();
})()