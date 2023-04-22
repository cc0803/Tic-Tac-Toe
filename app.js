const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", () => {
    overlay.style.transform = "scale(0)";
    Gameboard.resetGame();
})

const restart = document.querySelector(".start")
restart.addEventListener("click", () => {
    location.reload();
})

const Gameboard = (() => {
    let gameArray = ["", "", "", "", "", "", "", "", ""];

    const displayBoard = () => {
        // Create an index to later track which button corresponds to which array element
        let index = 0;

        gameArray.forEach(item => {
            let button = document.createElement("button");
            button.value = index;
            button.textContent = gameArray[index];
            document.querySelector(".game-container").appendChild(button);
            index++;
        })  
    }

    const updateBoard = () => {
        let buttons = document.querySelectorAll(".game-container>button");
        buttons.forEach(button => {
            button.textContent = gameArray[button.value];
        })
    }

    const resetGame = () => {
        location.reload();
    }

    return {displayBoard, updateBoard, gameArray, resetGame};
})();


const Player = (m) => {
    const marker = m;

    return {marker};
}


const Game = (() => {
    let gameArray = Gameboard.gameArray;
    let players = [Player("X"), Player("0")];
    let activePlayer = players[0];

    const selectPlayer = () => {
        let markerButton = Array.from(document.querySelectorAll(".marker-container>.marker"));
        markerButton.forEach(button => {
            button.addEventListener("click", () => {
                if (button.value === "X") {
                    players = [Player("X"), Player("0")];
                } else {
                    players = [Player("0"), Player("X")];
                }
            })
        })
    }

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const playGame = () => {
        let buttons = Array.from(document.querySelectorAll(".game-container>button"));
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                if (button.textContent === ""){
                    Gameboard.gameArray[button.value] = activePlayer.marker;
                    button.textContent = activePlayer.marker;
                    Gameboard.updateBoard();
                    won();
                    tie();
                    switchPlayer();
                    displayResults();
                }
            })
        })
    }

    const checkIfFieldIsEmpty = (element) => {
        if (element === ""){
            return true;
        } else {
            return false;
        }
    }

    const won = () => {

        for (let i = 0; i < gameArray.length; i++) {
            if (!checkIfFieldIsEmpty(gameArray[i])) {
                // check for horizontal matches
                if (
                (i + 1) % 3 === 0 && 
                gameArray[i] === gameArray[i - 1] && 
                gameArray[i] === gameArray[i - 2]
                ) {
                    return gameArray[i];
                // check for diagnol matches from upper right corner
                } else if (
                    i === 2 && 
                    gameArray[i] === gameArray[i + 2] && 
                    gameArray[i] === gameArray[i + 4]
                    ){
                    return gameArray[i];
                // check for diagnol matches from upper left corner
                } else if (
                    i === 0 &&
                    gameArray[i] === gameArray[i + 4] &&
                    gameArray[i] === gameArray[i + 8]
                ) {
                    return gameArray[i];
                // check for vertical matches
                } else if (
                    i < 3 &&
                    gameArray[i] === gameArray[i + 3] && 
                    gameArray[i] === gameArray[i + 6]
                ) {
                    return gameArray[i];
                }
            }
        }
    }

    const tie = () => {
        if (gameArray.filter(x => checkIfFieldIsEmpty(x)).length === 0) {
            overlay.textContent = "TIE";
            overlay.style.transform = "scale(1)";
        }
    }

    const displayResults = () => {
        if (won() === "X"){
            overlay.textContent = "X Wins!!!"
            overlay.style.transform = "scale(1)"
        } else if (won() === "0") {
            overlay.textContent = "O Wins!!!"
            overlay.style.transform = "scale(1)"
        }
    }

    return {playGame, selectPlayer, players};
})();

Game.selectPlayer();
Gameboard.displayBoard()
Game.playGame();
