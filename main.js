let numberOfPlayers = 2;

const getAndUpdateScores = () => {
    for (let i = 1; i <= numberOfPlayers; i++) {
        let playerIdentifier = "player" + i
        let playerScore = localStorage.getItem(playerIdentifier);
        document.getElementById(playerIdentifier).innerText = playerScore;
    }
}

const incrementPlayerScore = (playerNumber, scoreIncrement) => {
    let playerIdentifier = "player" + playerNumber
    let playerScore = localStorage.getItem(playerIdentifier);
    playerScore = parseInt(playerScore) + scoreIncrement;
    localStorage.setItem(playerIdentifier, playerScore);

    if (playerScore >= 121) {
        window.alert(`Congratulations player ${playerNumber} on winning`);
        resetAllScores();
    }

    getAndUpdateScores();
}

const initScores = () => {
    if (localStorage.length != numberOfPlayers) {
        for (let i = localStorage.length + 1; i <= numberOfPlayers; i++) {
            localStorage.setItem("player" + i, 0);
        }
    }

    getAndUpdateScores();
}

const resetAllScores = () => {
    for (let i = 1; i <= numberOfPlayers; i++) {
        localStorage.setItem("player" + i, 0);
    }

    getAndUpdateScores();
}

const generateScoreCard = () => {
    let htmlContent = "<tr>"
    // Generate title scores
    for (let i = 1; i <= numberOfPlayers; i++) {
        htmlContent += `<th><h1 class="display-1 text-center"><span id="player${i}">0</span><h1></th>`
    }
    htmlContent += "</tr>"

    // Generate buttons for +1 -> +4 
    for (let i = 1; i <= 4; i++) {
        htmlContent += "<tr>"
        for (let j = 1; j <= numberOfPlayers; j++) {
            htmlContent += generateColumnButton(j, i);
        }
        htmlContent += `</tr>`
    }

    // Add entry for +6
    htmlContent += "<tr>"
    for (let i = 1; i <= numberOfPlayers; i++) {
        htmlContent += generateColumnButton(i, 6);
    }
    htmlContent += `</tr>`

    // Add entry for manual score input
    htmlContent += "<tr>"
    for (let i = 1; i <= numberOfPlayers; i++) {
        htmlContent += `<td><input class="form-control" type="number" id="playerButton${i}"/></td>`
    }
    htmlContent += `</tr>`

    // Add entry for -1 incase of mistake
    htmlContent += "<tr>"
    for (let i = 1; i <= numberOfPlayers; i++) {
        htmlContent += generateColumnButton(i, -1);
    }
    htmlContent += `</tr>`


    // Set values in HTML
    document.getElementById("scoreCard").innerHTML = htmlContent;

    // Add event listeners after HTML has been configured
    for (let i = 1; i <= numberOfPlayers; i++) {
        let inputBox = document.getElementById("playerButton" + i)
        inputBox.addEventListener("keyup", e => {
            if (e.key == "Enter") {
                e.preventDefault();
                incrementPlayerScore(i, parseInt(inputBox.value));

                inputBox.value = "";
            }
        })
    }
}

const generateColumnButton = (playerNumber, scoreValue) => {
    let symbol = ""
    if (scoreValue > 0) {
        symbol = "+"
    }
    return `<td><div class="d-grid gap-2"><button onclick="incrementPlayerScore(${playerNumber}, ${scoreValue})" type="button" class="btn btn-light">${symbol}${scoreValue}</button></div></td>`
}

window.onload = () => {
    generateScoreCard();
    initScores();
};
