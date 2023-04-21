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
    let players = [Player("X"), Player("0")];
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
                    switchPlayer();
                }
            })
        })
    }
    return {buttonListener};
})();

Gameboard.displayBoard()
Game.buttonListener();
