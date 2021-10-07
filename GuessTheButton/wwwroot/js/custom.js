let button = document.getElementById("press");
let buttonsContainer = document.getElementById("buttonsContainer");

button.addEventListener("click", playGame);

function playGame() {
    generateButtons()
}

function generateButtons() {
    let numberOfButtons = document.getElementById("numberOfButtons").value;
    let randomGeneratedNumbers = createArrayOfNumbers(numberOfButtons);

    var winningNumber = randomGeneratedNumbers[generateWinningNumber(randomGeneratedNumbers.length - 1)];

    for (let i = 0; i < numberOfButtons; i++) {
        console.log(`${randomGeneratedNumbers[i]} ${winningNumber}`);
        let generatedButton = createButton();

        generatedButton.id = `btn-${randomGeneratedNumbers[i]}`;

        buttonsContainer.appendChild(generatedButton);
    }

}

function createButton() {
    let newButton = document.createElement("button");
    newButton.classList.add("btn", "btn-secondary", "my-1", "mx-1");
    newButton.innerHTML = "Am I the winner?";
    return newButton;
}

function generateWinningNumber(enteredNumber) {
    return Math.floor(Math.random() * enteredNumber + 1);
}

function createArrayOfNumbers(numberOfButtons) {
    let numbers = [];

    while (numbers.length < numberOfButtons) {
        let randomNumber = generateWinningNumber(numberOfButtons * numberOfButtons);
        if (!numbers.includes(randomNumber)) numbers.push(randomNumber);
    }

    return numbers;
}
