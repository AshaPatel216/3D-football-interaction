// the following import statement is solely for the type checking and
// autocompletion features in IDE.  A Behavior cannot inherit from
// another behavior or a base class but can use the methods and
// properties of the card to which it is installed.
// The prototype classes ActorBehavior and PawnBehavior provide
// the features defined at the card object.

import { PawnBehavior } from "../PrototypeBehavior";

class FootballPawn extends PawnBehavior {
  /**
   * Initial code execution
   */
  setup() {
    this.addEventListener("pointerDown", "changeFotballPosition");
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
  }
}

export default {
  modules: [
    {
      name: "FootballMove",
      pawnBehaviors: [FootballPawn]
    }
  ]
}

/* globals Microverse */
