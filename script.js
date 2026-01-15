const gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", "" ];

    const getBoard = () => board;

    const placeMark = (index, marker) => {
        if(board[index] === ""){
            board[index] = marker;
            return true;
        }

        else{
            return false;
        }
    }

    const checkWin = (marker) => {
        const wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
        for(let win of wins){
            let [a,b,c] = win;
            if(board[a] === marker && board[b] === marker && board[c] === marker){
                return marker;
            }
        }

        if(board.every(cell => cell!="")){
            return "tie";
        }
    }

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", "" ];
    }

    return{ getBoard, placeMark, checkWin, resetBoard }
})();

function createPlayer(name, marker) {
    return {name, marker};
}

const gameplay = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const resetGame = (name1 = "Player 1", name2 = "Player 2") => {
        const player1 = createPlayer(name1, 'X');
        const player2 = createPlayer(name2, 'O');
        players = [player1, player2];

        currentPlayerIndex = 0;
        gameboard.resetBoard();
        gameOver = false;
    };

    let switchPlayers = () => {
        currentPlayerIndex = currentPlayerIndex === 0? 1:0;
    }

    const getCurrentPlayer = () => players[currentPlayerIndex];


    const playTurn = (index) => {
        if(gameOver)return;

        const markPlaced = gameboard.placeMark(index, getCurrentPlayer().marker);

        if(!markPlaced) return;

        const result = gameboard.checkWin(getCurrentPlayer().marker);

        if (result) {
            gameOver = true;
            console.log(result === "tie" ? "Tie game!" : `${getCurrentPlayer().name} wins!`);
            return;
        }

        switchPlayers();
    }

    return{ playTurn, getCurrentPlayer, resetGame}


})();

const displayGame = (() => {
    const display = document.querySelector('.display');

    const render = () => {
        display.replaceChildren();
        gameboard.getBoard().forEach((cell, index) => {
            const square = document.createElement("div");
            square.classList.add('square');
            square.textContent = cell;
            square.addEventListener("click", () => {
                gameplay.playTurn(index);
                render();
            })
            display.appendChild(square);
        })
    }

  return { render };  
}
)();

document.querySelector(".restart").addEventListener("click", () => {
    gameplay.resetGame(name1, name2);
    displayGame.render();
});

gameplay.resetGame("Player 1", "Player 2");
displayGame.render();
