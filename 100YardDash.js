const numOfPlayers = 10;
let numOfPlayersFinished = 0;
const fieldLength = 100;
const playerList = [];

const playerGen = (draftOrder, yardLine, playerNumber) => {
  return {
    draftOrder,
    yardLine,
    playerNumber,
  }
};

for (let i = 0; i < numOfPlayers; i++) {
  playerList[i] = playerGen(0, 0, (i + 1));
};

console.log(playerList);

const randomRun = () => { return Math.floor(Math.random() * 10) + 1; };

const timeDelay = () => { return (Math.random() * 3000) + 1000; };

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function sleep(fn, ...args) {
  await timeout(timeDelay());
  return fn(...args);
};

const playerRun = async (player) => {
  player.yardLine += randomRun();
  console.log(`Player ${player.playerNumber} is at the ${player.yardLine} yard line.`);
  if (player.yardLine < fieldLength) {
    await sleep(playerRun, player);
  }
  else {
    numOfPlayersFinished++;
    player.draftOrder = numOfPlayersFinished;
    console.log(`Player ${player.playerNumber} finished in spot ${numOfPlayersFinished}`);
  }
};

for (let j = 0; j < numOfPlayers; j++) {
  playerRun(playerList[j]);
};