// the following import statement is solely for the type checking and
// autocompletion features in IDE.  A Behavior cannot inherit from
// another behavior or a base class but can use the methods and
// properties of the card to which it is installed.
// The prototype classes ActorBehavior and PawnBehavior provide
// the features defined at the card object.

import { PawnBehavior } from "../PrototypeBehavior";

class FootballPawn {
  /**
   * Initial code execution
   */
  setup() {
    this.userData = [];
  this.currentUserId = '';
   this.currentUserName = '';

    localStorage.removeItem("user");
    this.addEventListener("pointerDown", "changeFotballPosition");

    this.currentUserName = this.actor
    .service("PlayerManager")
    .players.get(this.viewId)._name;
  this.currentUserId = this.viewId;

    this.say("currentUserId", currentUserId);
  }

  /**
   * Move football to specific position
   */
  changeFotballPosition() {
    let newXPosition = this.translation[0] + 5;
    let newYPosition = this.translation[1];
    let newZPosition = this.translation[2];

    let newTranslation = [newXPosition, newYPosition, newZPosition]; // Example: move to 5 meters along the x-axis
    this.set({ translation: newTranslation });

    // Initialize the scores for all current users
    const allUsers = this.actor.service("PlayerManager").players;

    // update the score of user
    this.updateScoreboard(
      allUsers,
      this.currentUserId,
      this.currentUserName,
      5
    );
  }

  updateScoreboard(allUsers, currentUserId, currentUserName, score) {
    console.log(currentUserId);
    // // loop through all the active users
    //     allUsers.forEach((value, key) => {
    //       let userId = value._playerId;
    //       let userName = value._name;
    //       var updatedScore = 0;

    //       const idExists = this.userData.some((user) => user.id === currentUserId);

    //       if (!idExists) {
    //         this.userData.push({
    //           id: userId,
    //           name: userName,
    //           score: userId === currentUserId ?  scoreIncrement : 0,
    //         });

    //         updatedScore = 5;
    //       } else {
    //         const scoreToUpdate = this.userData.find((user) => user.id === currentUserId);

    //         scoreToUpdate.score = scoreToUpdate.score + 5;
    //         updatedScore = scoreToUpdate.score;
    //       }
    //       });

    //     let scoreDataContainer = document.getElementById('score-data');

    //     if(scoreDataContainer) {
    //       scoreDataContainer.innerHTML = '';
    //     }
    //     this.userData.forEach(data => {
    //         let div = document.createElement('div');
    //         div.innerHTML = `${data.name} => ${data.score}`;
    //         scoreDataContainer.appendChild(div);
    //     });

    this.say("dataUpdated", allUsers);
  }
}

class FootballActor {
  setup() {

    this.currentUserId = '';

    this.listen("dataUpdated", "dataUpdated");
    this.length("currentUserId", "currentUserId");
  }

  currentUserId(currentUserId) {
    this.currentUserId = currentUserId;
  }
  dataUpdated(data) {
console.log(this.currentUserId)
    //initial user data is empty
    let userData = [];

    //fetch userId & name from the data. stored into currentPlayers to get currently active players
    let currentPlayers = [];
    data.forEach((value, key) => {
      let userId = value._playerId;
      let userName = value._name;

      currentPlayers.push({
        id: userId,
        name: userName,
      });
    });

    // check if any data is there in localstorage or not
    let storedScoreData = JSON.parse(localStorage.getItem("user"));

    // if data is already there then first take it from local storage and save to userData object
    if (storedScoreData !== null) {
      userData = storedScoreData;
      currentPlayers.forEach((currentPlayer) => {
        // Check if the object's id already exists in existing player list
        const exists = userData.some(
          (oldPlayer) => oldPlayer.id === currentPlayer.id
        );
        if (!exists) {
          currentPlayer.score = 0;
          userData.push(currentPlayer); // Push the object from current player to existing user list if it doesn't exist
        }
      });

      for (let i = 0; i < userData.length; i++) {
        if (userData.id === currentUserId) {
          userData[i].score += 5;
        }
      }

      console.log(userData);
    } else {

      currentPlayers.forEach((currentPlayer) => {
        currentPlayer.score = 0;

        if(currentPlayer.id === currentUserId) {
          currentPlayer.score +=5;
        }
        userData.push(currentPlayer);


      });
     
      console.log(userData)

      localStorage.setItem("user", JSON.stringify(userData));
    }
    console.log(storedScoreData);

    // Convert the object to a string and save it in localStorage
    // localStorage.setItem("user", JSON.stringify(userData));
    // Get the total number of items in localStorage
    const localStorageLength = localStorage.length;

    // // Loop through all items in localStorage
    // for (let i = 0; i < localStorageLength; i++) {
    //   // Get the key at the current iteration
    //   const key = localStorage.key(i);

    //   // Get the value corresponding to the key
    //   const value = localStorage.getItem(key);

    // //  console.log(`Key: ${key}, Value: ${value}`);
    // }

    // loop through all the active users
    // data.forEach((value, key) => {
    //   let userId = value._playerId;
    //   let userName = value._name;
    //   var updatedScore = 0;

    //   userData.push({
    //     id: userId,
    //     name: userName,
    //     score: updatedScore,
    //   });
    // });

    let scoreDataContainer = document.getElementById("score-data");

    if (scoreDataContainer) {
      scoreDataContainer.innerHTML = "";
    }
    userData.forEach((data) => {
      let div = document.createElement("div");
      div.innerHTML = `${data.name} => ${data.score}`;
      scoreDataContainer.appendChild(div);
    });
  }
}

export default {
  modules: [
    {
      name: "FootballMove",
      pawnBehaviors: [FootballPawn],
      actorBehaviors: [FootballActor],
    },
  ],
};

/* globals Microverse */
