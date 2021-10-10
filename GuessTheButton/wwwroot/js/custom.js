let button = document.getElementById("press");
let buttonsContainer = document.getElementById("buttonsContainer");
let numberInput = document.getElementById("numberOfButtons");

button.addEventListener("click", (e) => generateButtons(e));

function generateButtons(e) {
	if (buttonsContainer.childElementCount > 0) {
		window.location.reload();
	} else {
		e.preventDefault();

		let numberOfButtons = numberInput.value;

		if (numberOfButtons >= 2) {
			numberInput.disabled = true;

			if (button.classList.contains("btn-danger")) {
				button.classList.replace("btn-danger", "btn-success");
			}

			button.classList.replace("btn-primary", "btn-success");

			button.innerHTML = "Play again";

			let randomGeneratedNumbers = createArrayOfNumbers(numberOfButtons);

			var winningNumber =
				randomGeneratedNumbers[generateWinningNumber(randomGeneratedNumbers.length - 1)];

			for (let i = 0; i < numberOfButtons; i++) {
				let currentIndex = randomGeneratedNumbers[i];
				let generatedButton = createButton();

				generatedButton.id = `btn-${currentIndex}`;

				let isWinner = checkWinner(winningNumber, currentIndex);

				generatedButton.addEventListener("click", () => {
					goThroughButtons(gameButtons, generatedButton, isWinner, winningNumber);
				});

				buttonsContainer.appendChild(generatedButton);
			}

			let gameButtons = buttonsContainer.querySelectorAll("button");
		} else changeButton(button, "You must create at least 2 buttons...", "btn-primary", "btn-danger");

	}
}

function goThroughButtons(buttons, choice, outcome, winningNumber) {
	buttons.forEach((button) => {
		let buttonId = button.id.split("-");
		if (button === choice && outcome) {
			changeButton(button, "Way to go! You won!", "btn-secondary", "btn-success");
		} else {
			if (Number.parseInt(buttonId[1]) === winningNumber) {
				changeButton(button, "This was the winner!", "btn-secondary", "btn-success");
        button.disabled = true;
			} else {
				changeButton(button, "Wrong one.", "btn-secondary", "btn-danger");
			}
		}
	});
}

function changeButton(selectedButton, text, classFrom, classTo) {
	selectedButton.classList.replace(classFrom, classTo);
	selectedButton.innerHTML = text;
	return selectedButton;
}

function checkWinner(winnerId, clickedId) {
	return winnerId === clickedId;
}

function createButton() {
	let newButton = document.createElement("button");
	newButton.classList.add("btn", "btn-secondary", "my-1", "mx-1", "w-25");
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