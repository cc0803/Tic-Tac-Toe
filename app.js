const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", () => {
    overlay.style.transform = "scale(0)";
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

    return {displayBoard, updateBoard, gameArray};
})();


const Player = (m) => {
    const marker = m;

    return {marker};
}


const Game = (() => {
    const gameArray = Gameboard.gameArray;
    const players = [Player("X"), Player("0")];
    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const buttonListener = () => {
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
                }
            })
        })
    }

    const checkIfFieldIsEmpty = (index) => {
        if (gameArray[index] === ""){
            return true;
        } 
        return false;
    }

    const won = () => {

        for (let i = 0; i < gameArray.length; i++) {
            if (!checkIfFieldIsEmpty(i)) {
                // check for horizontal matches
                if (
                (i + 1) % 3 === 0 && 
                gameArray[i] === gameArray[i - 1] && 
                gameArray[i] === gameArray[i - 2]
                ) {
                    console.log(gameArray[i]);
                    return gameArray[i];
                // check for diagnol matches from upper right corner
                } else if (
                    i === 2 && 
                    gameArray[i] === gameArray[i + 2] && 
                    gameArray[i] === gameArray[i + 4]
                    ){
                    console.log(gameArray[i]);
                    return gameArray[i];
                // check for diagnol matches from upper left corner
                } else if (
                    i === 0 &&
                    gameArray[i] === gameArray[i + 4] &&
                    gameArray[i] === gameArray[i + 8]
                ) {
                    console.log(gameArray[i]);
                    return gameArray[i];
                // check for vertical matches
                } else if (
                    i < 3 &&
                    gameArray[i] === gameArray[i + 3] && 
                    gameArray[i] === gameArray[i + 6]
                ) {
                    console.log(gameArray[i]);
                    return gameArray[i];
                }

            }
        }
    }

    const tie = () => {
        if (!gameArray.map(x => checkIfFieldIsEmpty(x)).length) {
            console.log("full");
        }
    }

    return {buttonListener};
})();

Gameboard.displayBoard()
Game.buttonListener();
