// Your code here
const charactersURL = "http://localhost:3000/characters";
const characterBar = document.getElementById("character-bar");
const detailedInfo = document.getElementById("detailed-info");
const animalname = document.getElementById("name");
const image = document.getElementById("image");
const voteCount = document.getElementById("vote-count");
const votesForm = document.getElementById("votes-form");
const votesInput = document.getElementById("votes");
const resetBtn = document.getElementById("reset-btn");
const characterForm = document.getElementById("character-form");
const nameInput = document.getElementById("name");
const imageUrlInput = document.getElementById("image-url");

// function to fetch characters data from the server
function fetchCharacters() {
  fetch(charactersURL)
    .then((response) => response.json())
    .then((data) => {
      // iterate over the characters array and display their names on the characterBar div
      data.forEach((character) => {
        const characterName = document.createElement("p");
        characterName.innerText = character.name;
        characterName.addEventListener("click", () => {
          // when a character name is clicked, update the detailed info section with their data
          updateDetailedInfo(character);
        });
        characterBar.appendChild(characterName);
      });
    })
    .catch((error) => console.log(error));
}

// function to update the detailed info section with a given character's data
function updateDetailedInfo(character) {
  animalname.innerText = character.name;
  image.src = character.image;
  voteCount.innerText = character.votes;
}

// function to update the vote count on the server for a given character
function updateVoteCount(characterName, votes) {
  fetch(charactersURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: characterName,
      votes: votes,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

// function to reset the vote count on the server for a given character
function resetVoteCount(characterName) {
  fetch(charactersURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: characterName,
      votes: 0,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

// function to add a new character to the server and update the UI
function addNewCharacter(name, imageUrl) {
  const newCharacter = {
    name: name,
    image: imageUrl,
    votes: 0,
  };
  fetch(charactersURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  })
    .then((response) => response.json())
    .then((data) => {
      // clear the form inputs and display the new character's name on the character bar
      nameInput.value = "";
      imageUrlInput.value = "";
      const characterName = document.createElement("p");
      characterName.innerText = data.name;
      characterName.addEventListener("click", () => {
        // when a character name is clicked, update the detailed info section with their data
        updateDetailedInfo(data);
      });
      characterBar.appendChild(characterName);
    })
    .catch((error) => console.log(error));
}

votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const votes = parseInt(votesInput.value);
    const characterName = animalname.innerText;
    const updatedVotes = parseInt(voteCount.innerText) + votes;
    updateVoteCount(characterName, updatedVotes);
    voteCount.innerText = updatedVotes;
  });
  
  // event listener for the reset button
  resetBtn.addEventListener("click", () => {
    const characterName = animalname.innerText;
    resetVoteCount(characterName);
    voteCount.innerText = 0;
  });
  
  // event listener for the character form submit button
  characterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const imageUrl = imageUrlInput.value;
    addNewCharacter(name, imageUrl);
  });

  // call fetchCharacters() when the page loads
window.addEventListener("load", fetchCharacters);

// add event listener for the votes form submit button to update the vote count
votesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const characterName = animalname.innerText;
  const votes = Number(votesInput.value);
  updateVoteCount(characterName, votes);
  updateDetailedInfo({ name: characterName, image: image.src, votes: votes });
});

// add event listener for the reset button to reset the vote count
resetBtn.addEventListener("click", () => {
  const characterName = animalname.innerText;
  resetVoteCount(characterName);
  updateDetailedInfo({ name: characterName, image: image.src, votes: 0 });
});

// add event listener for the character form submit button to add a new character
characterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const imageUrl = imageUrlInput.value;
  addNewCharacter(name, imageUrl);
});