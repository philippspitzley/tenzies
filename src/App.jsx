import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(generateAllDice());
  const buttonRef = useRef();
  const gameWon =
    dice.every((die) => die.value === dice[0].value) &&
    dice.every((die) => die.isHeld);

  useEffect(() => buttonRef.current.focus(), [gameWon]);
  console.log("rendered!");

  function generateAllDice() {
    return Array.from({ length: 10 }, () => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function rollDice() {
    if (gameWon) {
      return setDice(generateAllDice());
    }
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  function toggleHold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggleHold={() => toggleHold(die.id)}
    />
  ));

  return (
    <>
      <main>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="die-container">{diceElements}</div>

        {gameWon && <Confetti />}
        <button
          ref={buttonRef}
          onClick={rollDice}
          className={gameWon ? "new-game" : ""}
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}

export default App;
