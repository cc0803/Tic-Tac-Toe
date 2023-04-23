const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", () => {
    overlay.style.transform = "scale(0)";
    Gameboard.resetGame();
})

const restart = document.querySelector(".start");
restart.addEventListener("click", () => {
    Gameboard.resetGame();
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

    const clearBoard = () => {
        // First clear the inner html of the .game-container, so there isnt a second gameboard
        document.querySelector(".game-container").innerHTML = "";
        for (let i = 0; i < gameArray.length; i++){
            gameArray[i] = "";
        }
    }

    const resetGame = () => {
        clearBoard();
        displayBoard();
        Game.playGame();
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
                if (button.value === "0") {
                    activePlayer = players[1]
                    button.style.backgroundColor = "#888"
                    markerButton[0].style.backgroundColor = "#dfdfdf"
                    Gameboard.resetGame();
                } else {
                    activePlayer = players[0]
                    button.style.backgroundColor = "#888"
                    markerButton[1].style.backgroundColor = "#dfdfdf"
                    Gameboard.resetGame();
                }
            }, {once: true})
        })
    }

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const playGame = () => {
        // Running the selectPlayer method first, so Player can choose his marker without needing to click a gameboardfield
        selectPlayer();
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
            overlay.textContent = `${nameX} Wins!!!` 
            overlay.style.transform = "scale(1)"
        } else if (won() === "0") {
            overlay.textContent = `${nameO} Wins!!!`
            overlay.style.transform = "scale(1)"
        }
    }

    let nameX;
    let nameO;

    const nameSubmit = () => {
        const submitButton = document.querySelector("button[type='submit'");
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            nameX = document.querySelector("#playerOne").value;
            nameO = document.querySelector("#playerTwo").value;
            document.querySelector(".form-container").style.transform = "scale(0)";
            document.querySelector("body").style.pointerEvents = "all";
        })
    }

    return {playGame, nameSubmit};
})();

Game.nameSubmit();
Gameboard.displayBoard()
Game.playGame();
