import React, { useState } from "react";
// styled is a way to create React components that have styles attached to them.
// It's available from @emotion/styled. styled was heavily inspired by styled-components and glamorous.
import styled from "@emotion/styled";
import "./App.css";

// const Cell = styled.div`
//   border: 1px solid black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 48px;
// `;
const Cell = styled.div({
  width: "100%",
  height: "80px",
  backgroundColor: "gainsboro",
  border: "3px solid black",
  borderRadius: "10px",
  fontSize: 48,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  cursor: "pointer",
  ":hover": {
    backgroundColor: "lightgray",
  },
});

const BoardContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  width: 240,
  gridRowGap: 16,
  gridColumnGap: 16,
  // backgroundColor: "white",
  margin: "auto", // center by left and right is equal
});

const GameButton = styled.button({
  width: "240px",
  margin: "auto",
  height: "32px",
  marginTop: "16px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const winnerState = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (gameState) => {
  let winner;

  // calculate winner
  for (let i = 0; i < winnerState.length; i++) {
    const [a, b, c] = winnerState[i]; // destructuring
    // if the cell is not empty and the three cells are the same
    if (
      // check if the three cells are the same
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c] &&
      // check if the cell is not empty
      Boolean(gameState[a])
    ) {
      // return the winner (X or O) and stop the loop
      return gameState[a];
    }
  }
};

function App() {
  const [gameState, setGameState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [player, setPlayer] = useState("X");
  const winner = calculateWinner(gameState);
  const isTie = !winner && gameState.every(Boolean);
  const onCellClick = (index) => {
    // if there is a winner or the cell is already filled, do nothing
    if (gameState[index] !== "" || Boolean(winner) || isTie) {
      return;
    }
    // use ... to copy the array
    const newGameState = [...gameState];
    // copy current player
    newGameState[index] = player;
    setGameState(newGameState);
    // change player
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  };

  // use arrow function to avoid binding
  /*
  because we use arrow function, 
  we don't need to bind this function in the constructor of the class component 
  or use bind(this) in the render function to avoid the error "cannot read property 'setState' of undefined" 
  when we click the button to reset the game state and player state to initial state
  because the function is not bind to the App component and the this keyword is undefined
  */
  const resetGame = () => {
    setGameState(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: "gray", height: "100vh", padding: 16}}
    >
      <h1>Tic Tac Toe</h1>
      {/* use ternary operator to show winner or next player */}
      {winner ? (
        <h2>Winner is {winner}</h2>
      ) : isTie ? (
        <h2>Game is Tie</h2>
      ) : (
        <h2>Next player is {player}</h2>
      )}
      <BoardContainer>
        {/* map is a function that takes an array and returns a new array */}
        {gameState.map((cellNumber, index) => {
          return (
            <Cell onClick={() => onCellClick(index)} key={index}>
              {cellNumber}
            </Cell>
          );
        })}
      </BoardContainer>
      <GameButton onClick={() => resetGame()}>Reset</GameButton>
    </div>
  );
}

export default App;
