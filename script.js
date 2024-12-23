// variable for all the buttons
let btns = document.querySelectorAll('.btn');
let userInput = 0;
let roundOver = false;
let whoWonMsg = document.getElementById('who-won');
let playAgainBtn = document.getElementById("playAgain");
let dialog = document.getElementById('dialog');
let userForm = document.getElementById('userForm');
let player1;
let player2;

function showDialog() {
    dialog.showModal();
}

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);
    player1 = formData.get('xname');
    console.log(player1);
    player2 = formData.get('oname');
    console.log(player2);

    dialog.close();

})

// clear the board
function clearBoard() {
    btns.forEach( button => {
        button.textContent = '';
    });
}
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
    // game loop
   
        // for getting the user to say where to put the x or o
        btns.forEach(button => {
            button.addEventListener('click', (event) => {
                // get the user input
                if (event.target.classList.contains('btn') ) {
                    userInput = parseInt(event.target.getAttribute('data-index'));
                    // console.log(userInput);
                }
                console.log(gameboard.theBoard[userInput - 1])
                if (gameboard.theBoard[userInput - 1] !== '') {
                    alert('That spot is already taken!');
                    return;
                }
                roundOver = false;
                 while(!roundOver) {
                        
                    // console.log(userInput);
                    // while (userInput < 0 || userInput > 8 || isNaN(userInput)) {
                    //     userInput = parseInt(prompt("Invalid input. Please enter a number between 1 and 9"));
                    // }
                    // function to decide whose turn it is by dividing by 2 and seeing if there is a remainder and returning x or o
                    let whoseTurn = (function () {
                        if (gameboard.userTurn % 2 === 0) {
                            gameboard.userTurn++;
                            // console.log(player1);
                            return 'x';
                        } else {
                            gameboard.userTurn++;
                            return 'o';
                        }
                    })();
                    // To put the x or o in the correct place
                    gameboard.theBoard[userInput - 1] = whoseTurn;

                    // call the gameDisplayer function to display the board
                    gameDisplayer(userInput);
                    
                    // If  statement to check for wins and tie's 
                    if (checkWin(gameboard.theBoard, whoseTurn)) {
                        gameDisplayer();
                        // whoWonMsg.textContent = `Player ${whoseTurn} wins!`;
                        // console.log(`Player ${whoseTurn} wins!`);
                        if (whoseTurn === 'x') {
                            whoWonMsg.textContent = `Player ${player1} wins!`;
                        } else {
                            whoWonMsg.textContent = `Player ${player2} wins!`;
                        }
                        disableButtons();
                        roundOver = true;  // End the game
                    } else if (!gameboard.theBoard.includes('')) {
                        whoWonMsg.textContent = "It's a tie!";
                        console.log("It's a tie!")
                        disableButtons();
                        roundOver = true;
                    }
                    // console.log(userInput);
                    roundOver = true;
                }
    
            });
            
        })
        playAgainBtn.addEventListener('click', (event) => {
            window.location.reload();
        });

    
}

function disableButtons () {
    btns.forEach( button => {
        button.disabled = true;
    });
}

function gameDisplayer (userInput) {
    let buttonClicked = document.getElementById(userInput);
    // logs the gameboard to the console
    for (let i = 0; i < 9; i++) {
        btns.forEach( button => {
            if (button.getAttribute('data-index') === (i + 1).toString()) {
                button.textContent = gameboard.theBoard[i];
            }
        });
    }
    
}

showDialog()
gameController();
