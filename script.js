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

const dialog = document.querySelector("dialog");

const UIController = (() => {
    const restartBtn = document.querySelector(".restart");
    const closeButton = document.querySelector(".close-btn");
    const startGame = document.querySelector('.start-game-btn');

    const getPlayerNames = () => {
        const player1Name = document.getElementById('player1').value;
        const player2Name = document.getElementById('player2').value;
        return { player1Name, player2Name }
    }

    const bindEvents = () => {
        restartBtn.addEventListener("click", () => {
            const { player1Name, player2Name } = getPlayerNames();
            gameplay.resetGame(player1Name, player2Name);
            displayGame.render();
        });

        closeButton.addEventListener("click", () => {
            dialog.close();
        });

        startGame.addEventListener('click', (e) => {
            const { player1Name, player2Name } = getPlayerNames();
            gameplay.resetGame(player1Name, player2Name);       
            dialog.close();
            displayGame.render();
        });
    }

    return { bindEvents };

})();

UIController.bindEvents();
dialog.showModal();
gameplay.resetGame("Player 1", "Player 2");
displayGame.render();
