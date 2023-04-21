const Gameboard = (() => {
    let gameboardArray = [null, null, null, null, null, null, null, null, null];
    let markers = ["X", "O"];
})()

const Player = (m) => {
    const marker = m;
}

const Gameflow = (marker) => {
    const FIELDS = Array.from(document.querySelectorAll(".game-container>button"));
    const placeMarker = function() {
        FIELDS.forEach(field => {
            field.addEventListener("click", function() {
                field.textContent = marker;
            })
        })
    }
    return {placeMarker};
};

let game = Gameflow("X");

game.placeMarker("X");