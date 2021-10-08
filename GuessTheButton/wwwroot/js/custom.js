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
        randomGeneratedNumbers[
          generateWinningNumber(randomGeneratedNumbers.length - 1)
        ];

      for (let i = 0; i < numberOfButtons; i++) {
        console.log(`${randomGeneratedNumbers[i]} ${winningNumber}`);
        let generatedButton = createButton();

        generatedButton.id = `btn-${randomGeneratedNumbers[i]}`;

        buttonsContainer.appendChild(generatedButton);
      }

      let gameButtons = buttonsContainer.querySelectorAll("button");

      gameButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let buttonId = btn.id.split("-");

          if (buttonId[1] == winningNumber) {
            let winningButton = btn;
            btn.classList.replace("btn-secondary", "btn-success");
            btn.innerHTML = `Way to go! You won!`;

            gameButtons.forEach((losingButton) => {
              if (losingButton.id !== winningButton.id) {
                losingButton.classList.replace("btn-secondary", "btn-danger");
                losingButton.innerHTML = `Wrong one.`;
                losingButton.disabled = true;
              }
            });
          } else {
            gameButtons.forEach((losingButton) => {
              let losingButtonId = losingButton.id.split("-");
              if (losingButtonId[1] == winningNumber) {
                losingButton.innerHTML = `This was the winner!`;
                losingButton.classList.replace("btn-secondary", "btn-success");
                losingButton.disabled = true;
              } else {
                losingButton.classList.replace("btn-secondary", "btn-danger");
                losingButton.innerHTML = `Wrong one.`;
                losingButton.disabled = true;
              }
              btn.disabled = false;
            });
            btn.classList.replace("btn-secondary", "btn-danger");
            btn.innerHTML = `Wrong one.`;
          }
        });
      });
    } else {
      button.classList.replace("btn-primary", "btn-danger");
      button.innerHTML = "You must create at least 2 buttons...";
    }
  }
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
