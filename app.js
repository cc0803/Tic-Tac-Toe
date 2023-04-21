const buttonContainer = document.querySelector(".game-container");

const Gameboard = (() => {
    let gameboardArray = ["", "", "", "", "", "", "", "", ""];
    let markers = ["X", "O"];

    const createButtons = () => {
        removeOldButtons();
        let index = 0;
        gameboardArray.forEach(element => {
            let button = document.createElement("button");
            button.value = index;
            index++;
            button.textContent = element;
            buttonContainer.appendChild(button);
        })
    }

    const removeOldButtons = () => {
        buttonContainer.innerHTML = "";
    }
    return {createButtons, gameboardArray};
})();

const Player = (m) => {
    const marker = m;

    return {marker};
}

const Gameflow = ((marker) => {
    const players = [Player("X"), Player("0")];
    let activePlayer = players[0];

    const changeTurns = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const placeMarker = () => {
        let buttons = Array.from(document.querySelectorAll(".game-container>button"));

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                if (Gameboard.gameboardArray[button.value] === "") {
                    Gameboard.gameboardArray[button.value] = activePlayer.marker;
                    Gameboard.createButtons();
                    changeTurns();
                }
            })
        })
    }

    const createGame = () => {
        Gameboard.createButtons();
        placeMarker();
    }

    return {createGame};
})();

Gameflow.createGame()


// Gameboard
    // GameArray
    // displayUI

// Player
    // marker
    // placemarker

// Gameflow
    // whos turn is it
    // Player.placemarker
    // Gameboard.displayUI
    // check for winner
    // change turns
