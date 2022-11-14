import Board from './board.js';
import Img from './imgCreate.js';

const hitSpan = document.getElementById('hit')
const missSpan = document.getElementById('miss')
let count = 0;
let countChange = 1;
let id;
let loss = 0;
const imgNew = Img.create();
const board = new Board(4);
board.renderBoard();

const arrField = Array.from(document.getElementsByClassName('field'));
const fullBoard = document.getElementById('board');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawField() {
  const colRandom = getRandomInt(0, 3);
  const rowRandow = getRandomInt(0, 3);
  const element = arrField.find((item) => item.dataset.col === `${colRandom}`
    && item.dataset.row === `${rowRandow}`);
  element.classList.remove('free');
  element.classList.add('busy');
  element.insertAdjacentElement('afterBegin', imgNew);
}

function isActive() {
  return (arrField.findIndex((item) => (item.classList.contains('busy'))));
}

function toggleField() {
  const t = isActive.call(arrField);
  if (t !== -1) {
    const deletable = arrField[t].firstElementChild;
    arrField[t].classList.remove('busy');
    arrField[t].classList.add('free');
    if (arrField[t].classList.contains('hide')) {
      arrField[t].classList.remove('hide');
    }
    deletable.remove();
    drawField();
    imgNew.style.display = 'flex';
  }
}

function changeField() {
  toggleField();
  // console.log(count);
  hitSpan.textContent = count;
  missSpan.textContent = countChange - count - loss;
  if (loss === 5 || (countChange - count - loss) === 5) {
    clearInterval(id);
    alert(`Игра окончена! \n Появилось : ${countChange}\n ------------ \n Попаданий: ${count}  \n Промахи при клике : ${loss}\n Пропущено появлений : ${countChange - count - loss}`);
  }
  countChange += 1;
}

drawField();

fullBoard.addEventListener('click', (event) => {
  if (event.target.closest('.style-img')) {
    count += 1;
    arrField[isActive.call(arrField)].classList.add('hide');
    imgNew.style.display = 'none';
  } else {
    loss += 1;
  }
});

id = setInterval(() => changeField.call(arrField), 1000);
