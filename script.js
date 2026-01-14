const gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", "" ];

    const getBoard = () => board;

    const placeMark = (index, mark) => {
        if(board[index] === ""){
            board[index] = mark;
        }
    }

    const checkWin = () => {
        const wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
        for(let win of wins){
            const [a,b,c] = win;
            if(board[a] === board[b] && board[a] === board[c]){
                return board[a];
            }
        }

        if(board.every(cell => cell!="")){
            return "tie";
        }

        return false;
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

})();