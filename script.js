let board = ["", "", "", "", "", "", "", "", ""];
var turn = "player";
let running = true;


//bots turn
function botPlace() {
    if (!running) return; 

    let check = true;

    while (check) {
        let place = Math.floor(Math.random() * 9);

        if (board[place] === "" && turn === "O") {
            board[place] = 'O';
            document.getElementById(`a${place}`).innerText = 'O';
            check = false;
            checkWin();

            if (running) {
                turn = "player";
                document.getElementById('message').innerText = "Player's turn";

            }

        }
    }

}

//players turn
function playerPlace(place) {
    if (!running) return; 

    if (board[place] === "" && turn === "player") {
        board[place] = "X";
        document.getElementById(`a${place}`).innerText = 'X';
        checkWin();

        if (running) { 
            turn = "O";
            document.getElementById('message').innerText = "Bot's turn";
            setTimeout(botPlace, 500); 

        }
        
    } else if (turn !== "player") {
        document.getElementById('message').innerText = "Not your turn!";

    }

    
}


//checking for a win
function checkWin() {
    let winner = null;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];

        }
    }

    if (winner == "X") {
        winner = "You";

    }

    if (winner) {
        document.getElementById('message').innerText = winner + " won!";
        running = false; 
        turn = null;

    } else if (board.every(button => button !== "")) {
        document.getElementById('message').innerText = "It's a tie!";
        running = false; 
        turn = null;

    }
}

//resetting the game
function reset() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "player";
    running = true; 
    document.getElementById('message').innerText = "Player's turn";

    for (let i = 0; i < 9; i++) {
        document.getElementById(`a${i}`).innerText = '';

    }
}


document.querySelectorAll('.button').forEach((button, index) => {
    button.addEventListener('click', () => playerPlace(index));
});


document.getElementById('resetbtn').addEventListener('click', reset);
