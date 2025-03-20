document.addEventListener("DOMContentLoaded", function () {
    
    const username = window.username || 'Guest';
    console.log("Loaded username:", username);

    if (username === 'Guest') {
        displayErrorMessage("Log in to see the puzzles.");
        return;
    }

    
    window.game = new Chess();
    const boardElement = document.getElementById("board");
    if (!boardElement) {
        console.error("Chessboard container element (#board) not found.");
        return;
    }

   
    window.board = Chessboard(boardElement, {
        position: 'start',
        draggable: true,
        onDrop: handleMove
    });

    
    window.puzzleSolutions = [];
    window.currentMoveIndex = 0;

   
    fetch("/api/daily-puzzle")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Daily Puzzle Data Received:", data);
            loadPuzzle(data);
        })
        .catch(error => {
            console.error("Error loading the daily puzzle:", error);
            displayErrorMessage("Failed to load the puzzle. Please try again later.");
        });

    
    function loadPuzzle(data) {
        if (!data || typeof data.position !== 'string' || !Array.isArray(data.solutions)) {
            throw new Error("Invalid puzzle data received from the server.");
        }
        if (!game.load(data.position)) {
            throw new Error(`Invalid FEN string: ${data.position}`);
        }
        board.position(game.fen());
       
        const puzzleTitleElement = document.getElementById("puzzle-title");
        if (puzzleTitleElement && data.title) {
            puzzleTitleElement.innerText = data.title;
        }
        
        window.puzzleSolutions = data.solutions.map(solution =>
            Array.isArray(solution) ? solution.map(move => move.trim()) : []
        );
        if (window.puzzleSolutions.length === 0) {
            throw new Error("No valid moves found in puzzle solutions.");
        }
        window.currentMoveIndex = 0;
    }

    
    function getRandomPuzzle() {
        fetch("/api/random-puzzle")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Random Puzzle Data Received:", data);
                loadPuzzle(data);
            })
            .catch(error => {
                console.error("Error loading the random puzzle:", error);
                displayErrorMessage("Failed to load the puzzle. Please try again later.");
            });
    }

    
    function handleMove(source, target) {
        let moveObj = { from: source, to: target };
        const pieceOnSource = game.get(source);
        if (!pieceOnSource) {
            console.error('No piece on source square!');
            return 'snapback';
        }
        if (
            pieceOnSource.type === 'p' &&
            ((game.turn() === 'w' && target[1] === '8') ||
             (game.turn() === 'b' && target[1] === '1'))
        ) {
            let promotion = prompt("Promote to (Q, R, B, N)?", "Q").toUpperCase();
            if (!['Q', 'R', 'B', 'N'].includes(promotion)) {
                alert("Invalid choice, defaulting to Queen.");
                promotion = 'Q';
            }
            moveObj.promotion = promotion.toLowerCase();
        }
        const attemptedMove = game.move(moveObj);
        if (!attemptedMove) {
            console.error(`Invalid move: ${source}-${target}`);
            alert("Invalid move! Try again.");
            return 'snapback';
        }
        const moveSAN = attemptedMove.san;
        const expectedSolution = window.puzzleSolutions.find(solution => solution[window.currentMoveIndex] === moveSAN);
        if (expectedSolution) {
            console.log("Correct move!");
            board.position(game.fen());
            window.currentMoveIndex++;
            if (window.currentMoveIndex < expectedSolution.length) {
                setTimeout(() => {
                    const opponentMove = expectedSolution[window.currentMoveIndex];
                    game.move(opponentMove);
                    board.position(game.fen());
                    window.currentMoveIndex++;
                }, 500);
            }
            if (window.currentMoveIndex >= expectedSolution.length) {
                setTimeout(() => alert('Puzzle solved!'), 500);
            }
        } else {
            console.error(`Incorrect move! Expected: ${window.puzzleSolutions[window.currentMoveIndex]}, Got: ${moveSAN}`);
            alert("Incorrect move! Try again.");
            game.undo();
            board.position(game.fen());
            return 'snapback';
        }
    }

    
    function updateBoardAfterPromotion() {
        board.position(game.fen());
    }
    setInterval(updateBoardAfterPromotion, 100);

    
    function displayErrorMessage(message) {
        const errorElement = document.getElementById("error-message");
        errorElement.innerText = message;
        errorElement.style.display = "block";
    }

    
    window.getRandomPuzzle = getRandomPuzzle;
});
