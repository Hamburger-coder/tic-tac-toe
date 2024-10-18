// this is a tictactoe game
const gameboard = (function () {
    // variable for deciding whose turn it is
    let userTurn = 0;
    // the gameboard object
    let gameobj = {
        board: [
            '', '', '', 
            '', '', '', 
            '', '', '',
        ]
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
// checks for a win with the current player
function checkWin(board, player) {
    // Loop through all winning combinations
    for (let i = 0; i < gameboard.winningCombos.length; i++) {
        let combo = gameboard.winningCombos[i];
        
        // Check if all three positions in this combo are occupied by the player
        let position1 = combo[0];
        let position2 = combo[1];
        let position3 = combo[2];
        
        if (board[position1] === player &&
            board[position2] === player &&
            board[position3] === player) {
            // If all three positions match the player, we have a win
            return true;
        }
    }
    
    // If we've checked all combinations and found no win, return false
    return false;
}


// function to control the flow of the game
function gameController () {
    let gameOver = false;
    // game loop
    while(!gameOver) {
        // for getting the user to say where to put the x or o
        userInput = parseInt(prompt("Enter a number between 1 and 9"));
        while (userInput < 0 || userInput > 8 || isNaN(userInput)) {
            userInput = parseInt(prompt("Invalid input. Please enter a number between 1 and 9"));
        }
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
        
        // If  statement to check for wins and tie's 
        if (checkWin(gameboard.theBoard, whoseTurn)) {
            gameDisplayer();
            console.log(`Player ${whoseTurn} wins!`);
            gameOver = true;  // End the game
        } else if (!gameboard.theBoard.includes('')) {
            console.log("It's a tie!")
            gameOver = true;
        }
        
    }
}

function gameDisplayer () {
    // logs the gameboard to the console
    console.log('\nCurrent board:');
    for (let i = 0; i < 9; i += 3) {
        console.log(gameboard.theBoard.slice(i, i + 3).join(' | '));
        if (i < 6) console.log('---------');
    }
    console.log('\n');
}


gameController();
console.log("Finally!!!!");

