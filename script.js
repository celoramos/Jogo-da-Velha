// Jogo da velha
const board = document.querySelector(".board");
const squares = document.querySelectorAll(".square");
const restart = document.querySelector(".restart");
const result = document.querySelector(".result");
const resultText = document.querySelector(".resultText");

const playerX = "X";
const player0 = "0";
let currentPlayer = playerX;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleClick = (e) => {
    const square = e.target;
    if (square.innerHTML !== "") return;
    makeMove(square, currentPlayer);
    if (checkWinner(currentPlayer)) {
        resultText.innerHTML = `${currentPlayer} venceu!`;
        endGame();
        return;
    }
    if (isDraw()) {
        resultText.innerHTML = "Empate!";
        endGame();
        return;
    }
    changePlayer();
};

const makeMove = (square, move) => {
    square.innerHTML = move;
    square.classList.add(move);
    square.removeEventListener("click", handleClick);
};

const changePlayer = () => {
    currentPlayer = currentPlayer === playerX ? player0 : playerX;
    resultText.innerHTML = `${currentPlayer}'s turn`;
};

const checkWinner = (player) => {
    return winningCombination.some((combination) => {
        return combination.every((index) => {
            return squares[index].classList.contains(player);
        });
    });
};

const isDraw = () => {
    return [...squares].every((square) => square.innerHTML !== "");
};

const endGame = () => {
    squares.forEach((square) => square.removeEventListener("click", handleClick));
};

const restartGame = () => {
    squares.forEach((square) => {
        square.innerHTML = "";
        square.classList.remove(playerX);
        square.classList.remove(player0);
        square.addEventListener("click", handleClick);
    });
    currentPlayer = playerX;
    resultText.innerHTML = `${currentPlayer}'s turn`;
};

squares.forEach((square) => square.addEventListener("click", handleClick));
restart.addEventListener("click", restartGame);
