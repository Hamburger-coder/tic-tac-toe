// this is a tictactoe game
const gameboard = (function () {
    // variable for deciding whose turn it is
    let userTurn = 0;
    // the gameboard object
    let gameobj = {
        board: [
            ['1', '2', '3'], 
            ['4', '5', '6'], 
            ['7', '8', '9']
        ],
    };

    let winningCombos = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6], // Diagonal from top-right to bottom-left
    ];
    // return the board and the userTurn so other functions can access it
    return { theBoard: gameobj.board, userTurn: userTurn, winningCombos: winningCombos };
})();

// function to control the flow of the game
function gameController () {
    // for getting the user to say where to put the x or o
    userInput = parseInt(prompt("Enter a number between 1 and 9"));
    // function to decide whose turn it is by dividing by 2 and seeing if there is a remainder and returning x or o
    let whoseTurn = (function () {
        if (gameboard.userTurn % 2 === 0) {
            gameboard.userTurn++;
            return 'x';
        } else {
            gameboard.userTurn++;
            return 'o';
        }
    })();
    // To put the x or o in the correct place
    gameboard.theBoard[userInput] = whoseTurn;
    // call the gameDisplayer function to display the board
    gameDisplayer();
}

function gameDisplayer () {
    // logs the gameboard to the console
    gameboard.theBoard.forEach(function (item) {
        console.log(item[0] + ' ' + item[1] + ' ' + item[2]);
    });
    // gameController();
}


gameController();

