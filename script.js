const gameContainer = document.getElementById("game");

const COLORS = [
  "green",
  "orange",
  "purple",
  "cyan",
  "green",
  "orange",
  "purple",
  "cyan",
];


function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color, 'img-thumbnail', 'unactive');

    // Set the background image for each card
    newDiv.style.backgroundImage = 'url("light.jpg")';
    newDiv.style.width = "150px"; 
    newDiv.style.height = "150px";
    newDiv.style.backgroundSize = "cover";
    newDiv.style.backgroundPosition = "center";

    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let cardArray = [];
let isProcessing = false;
let matchedPair = 0;

function handleCardClick(event) {
  if (isProcessing || cardArray.includes(event.target)) {
    return;
  }

  let color = Array.from(event.target.classList).find(cls => COLORS.includes(cls));
  cardArray.push(event.target);

  // When revealing the card color
  event.target.style.backgroundImage = 'none';
  event.target.style.backgroundColor = color;
  event.target.classList.toggle('rotated');


  if (cardArray.length === 2) {
    isProcessing = true;
    if (cardArray[0].style.backgroundColor === cardArray[1].style.backgroundColor) {
      matchedPair++;
      cardArray.forEach(card => card.style.pointerEvents = 'none');
      cardArray = [];

      const totalCards = gameContainer.children.length;
      if (matchedPair === totalCards / 2) {
        winningMessage.style.display = 'block';
      }
      isProcessing = false;

    } else {
      setTimeout(() => {
        cardArray.forEach(card => {
          card.style.backgroundImage = 'url("light.jpg")';
          card.style.backgroundColor = 'transparent';
          card.classList.remove("rotated");
        });
        cardArray = [];
        isProcessing = false;
      }, 1000);
    }
  }
}

const winningMessage = document.querySelector('#winMessage');
const button = document.querySelector('button');

button.addEventListener('click', function(e){
  cardArray.length = 0;
  matchedPair = 0;

  const cards = gameContainer.children;
  Array.from(cards).forEach(card => {
    card.style.backgroundImage = 'url("light.jpg")';
    card.style.backgroundColor = 'transparent';
    card.style.pointerEvents = 'auto';
  });

  winningMessage.style.display = 'none';
});

// when the DOM loads
createDivsForColors(shuffledColors);
