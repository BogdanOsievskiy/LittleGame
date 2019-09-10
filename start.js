'use strict';


function selectSize() {
    const input = document.getElementById('sizeInput');
    const inputWrapp = document.getElementsByClassName('input');
    const btn = document.getElementById('startGame');
    const wrapp = document.getElementById('game-wrapp');
    btn.addEventListener('click', () => {
        if (input.value === '' || input.value > 20) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
            wrapp.classList.add('start');
            inputWrapp[0].classList.add('hide');
            createSquares(input.value);
        }
    })
}

selectSize();

async function createSquares(count) {
    const wrapp = document.getElementById('game-wrapp');
    const wrappWidth = count * 50;
    wrapp.style.width = wrappWidth;
    let  x = 1;
    let y = 0;
    for (let i = 0; i < count * count; i++) {
        const item = document.createElement("div");
        const blockInRow = wrappWidth / 50;
        if (i % blockInRow) {
            x++;
        } else {
            x = 1;
        }

        if ( !(i % count)) {
            y++;
        }
        item.setAttribute('corX', x);
        item.setAttribute('corY', y);
        const color = Math.random() > 0.3 ? 'red' : 'green';
        item.className = `game-item xCor-${x} yCor-${y}`;
        wrapp.appendChild(item);
        setTimeout(() => {
            item.classList.add(`${color}`);
        }, (i * 10));
    }
    await addSquearListener(count);
}

function squereClick(item, count) {
    const x = Number(item.target.getAttribute('corx'));
    const y = Number(item.target.getAttribute('cory'));
    const otherBlocks = getBlockToChange(x, y, count);
    const bloksToChange = [item.target];
    const result = bloksToChange.concat(otherBlocks);
    result.forEach((item) => {
        item.classList.remove('red');
        item.classList.add('green');
    });

    const reds = document.querySelectorAll('.game-item.red');
    if (reds.length === 0) {
        congrads();
    }
}

function getBlockToChange(x, y, value) {
    let bloksToChnage = [];
    if (x === 1) {
        bloksToChnage.push(document.querySelector(`.xCor-${x + 1}.yCor-${y}`));
    } else if (x === Number(value)) {
        bloksToChnage.push(document.querySelector(`.xCor-${x - 1}.yCor-${y}`));
    } else {
        bloksToChnage.push(document.querySelector(`.xCor-${x + 1}.yCor-${y}`));
        bloksToChnage.push(document.querySelector(`.xCor-${x - 1}.yCor-${y}`));
    }
    if (y === 1) {
        bloksToChnage.push(document.querySelector(`.xCor-${x}.yCor-${(y + 1)}`));
    } else if( y === Number(value)) {
        bloksToChnage.push(document.querySelector(`.xCor-${x}.yCor-${y - 1}`));
    } else {
        bloksToChnage.push(document.querySelector(`.xCor-${x}.yCor-${(y + 1)}`));
        bloksToChnage.push(document.querySelector(`.xCor-${x}.yCor-${y - 1}`));
    }
    return bloksToChnage;
}
function addSquearListener(count) {
    let blocks = document.getElementsByClassName('game-item');
    for (let i = 0; i < blocks.length; i++ ) {
        blocks[i].addEventListener('click', (e) => {
            squereClick(e, count);
        });
    }
}

function congrads () {
    const title = document.getElementById('title');
    title.innerHTML = 'You won';
}






