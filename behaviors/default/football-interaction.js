// the following import statement is solely for the type checking and
// autocompletion features in IDE.  A Behavior cannot inherit from
// another behavior or a base class but can use the methods and
// properties of the card to which it is installed.
// The prototype classes ActorBehavior and PawnBehavior provide
// the features defined at the card object.

import { ActorBehavior, PawnBehavior } from "../PrototypeBehavior";

class FootballPawn extends PawnBehavior {
  /**
   * Initial code execution
   */
  setup() {
    this.addEventListener("pointerDown", "changeFotballPosition");
  }

  /**
   * Move football to specific position (towards X in this method)
   */
  changeFotballPosition() {
    let newXPosition = this.translation[0] + 5; // update the position
    let newTranslation = [
      newXPosition,
      this.translation[1],
      this.translation[2],
    ]; // Example: move to 5 meters along the x-axis
    this.set({ translation: newTranslation }); // set new positions

    let playerName = this.actor
      .service("PlayerManager")
      .players.get(this.viewId)._name; // current player name
    this.say("dataUpdated", playerName); // publish an event with current name to update the score
  }
}

class FootballActor extends ActorBehavior {
  setup() {
    alert("Hello");
    this.listen("dataUpdated", "updateScore"); // subscribe the event to update score
  }

  /**
   * update player's score
   * @param {*} playerName Name of the player
   */
  updateScore(playerName) {
    if (this.myObject === undefined) {
      this.myObject = {};
    }
    if (this.myObject.hasOwnProperty(playerName)) {
      this.myObject[playerName] += 5;
    } else {
      this.myObject[playerName] = 5;
    }
    console.log(this.myObject);
    this.updateScoreTable(this.myObject);
  }

  /**
   * Update score table
   * @param {*} myObject stores Name & score of players
   */
  updateScoreTable(myObject) {
    let mainContainer = document.getElementById("score-container");
    mainContainer.style.display = "block";

    let totalTableRow = document.querySelectorAll("table tr");

    // remove all score data first except heading
    if (totalTableRow.length > 1) {
      for (var i = totalTableRow.length - 1; i > 0; i--) {
        // Remove each row except the first one
        totalTableRow[i].parentNode.removeChild(totalTableRow[i]);
      }
    }

    let scoreTable = document.getElementById('score-table');

    // loop through all objetcs stored and create table data
    for (let key in myObject) {
      if (myObject.hasOwnProperty(key)) {
        // create new row
        let row = document.createElement('tr');

        //create column for name
        let nameData = document.createElement('td'); // create <td>
        nameData.textContent = key; // add data into it
        row.appendChild(nameData); // append td into tr

        //create column for score
        let scoreData = document.createElement('td'); // create <td>
        scoreData.textContent = myObject[key]; // add data into it
        row.appendChild(scoreData); // append td into tr

        scoreTable.appendChild(row); // once tr is created. append it into table
      }
    }
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
