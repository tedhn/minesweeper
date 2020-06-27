import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./style.scss";

import Square from "./square";

import { gsap } from "gsap";

// stuck on adding red to specific box

function App() {
  return <Board />;
}

function Board() {
  let [board, setBoard] = useState(
    Array(10)
      .fill(0)
      .map((x) =>
        Array(10).fill({
          mined: false,
          surroundingMines: 0,
          show: false,
          flagged: false,
        })
      )
  );
  let [gameover, setGameover] = useState(false);
  let [coor, setCoor] = useState([]);
  // let mineCount = 10;
  let [mineCount, setMineCount] = useState(10);

  const setMines = (num) => {
    let total = num;
    let mines = [];
    let newBoard = [...board];

    // adding mines //
    while (total > 0) {
      let r = Math.floor(Math.random() * 10);
      let c = Math.floor(Math.random() * 10);

      let rc = r + "" + c;

      if (!mines.includes(rc)) {
        total--;
        mines.push(r + "" + c);
      }
    }
    setCoor(mines);

    // calculating how many mines around it //
    // keeping overwriting the true part with the false part // fixed
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let totalMines = checkSurrounding(x, y, mines);
        newBoard[x][y] = {
          mined: false,
          surroundingMines: totalMines,
          show: false,
          flagged: false,
        };
      }
    }

    mines.forEach((value) => {
      let r = parseInt(value.substring(0, 1), 10);
      let c = parseInt(value.substring(1, 2), 10);
      newBoard[r][c] = {
        mined: true,
        surroundingMines: newBoard[r][c].surroundingMines,
        show: false,
        flagged: false,
      };
    });

    setBoard(newBoard);
  };

  const checkSurrounding = (x, y, minesArr) => {
    let totalMines = 0;

    totalMines += checkLeft(x, y, minesArr);
    totalMines += checkRight(x, y, minesArr);
    totalMines += checkBottom(x, y, minesArr);
    totalMines += checkTop(x, y, minesArr);
    totalMines += checkTopRight(x, y, minesArr);
    totalMines += checkBottomRight(x, y, minesArr);
    totalMines += checkTopLeft(x, y, minesArr);
    totalMines += checkBottomLeft(x, y, minesArr);

    return totalMines;
  };

  // checking surrouding mines //

  const checkLeft = (x, y, minesArr) => {
    let newY = y - 1;
    let newID = x + "" + newY;

    if (newY < 0) {
      return 0;
    }

    if (minesArr.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkRight = (x, y, minesArr) => {
    let newY = y + 1;
    let newID = x + "" + newY;

    if (newY > 9) {
      return 0;
    }

    if (minesArr.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkTop = (x, y, minesArr) => {
    let newX = x - 1;
    let newID = newX + "" + y;

    if (newX < 0) {
      return 0;
    }

    if (minesArr.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkBottom = (x, y, minesArr) => {
    let newX = x + 1;
    let newID = newX + "" + y;

    if (newX > 9) {
      return 0;
    }

    if (minesArr.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkTopRight = (x, y, minesArr) => {
    let newY = y + 1;
    let newX = x - 1;

    let newID = newX + "" + newY;

    if (newX < 0 || newY > 9) {
      return 0;
    }
    if (minesArr.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkBottomRight = (x, y, minesArr) => {
    let newY = y + 1;
    let newX = x + 1;

    let newID = newX + "" + newY;

    if (newX > 9 || newY > 9) {
      return 0;
    }
    if (minesArr.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkBottomLeft = (x, y, minesArr) => {
    let newY = y - 1;
    let newX = x + 1;

    let newID = newX + "" + newY;
    if (newX > 9 || newY < 0) {
      return 0;
    }
    if (minesArr.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkTopLeft = (x, y, minesArr) => {
    let newY = y - 1;
    let newX = x - 1;

    let newID = newX + "" + newY;

    if (newX < 0 || newY < 0) {
      return 0;
    }
    if (minesArr.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };

  // opening surround Mines //
  const openSurrounding = (x, y, temp) => {
    openLeft(x, y, temp);
    openRight(x, y, temp);
    openBottom(x, y, temp);
    openTop(x, y, temp);
    openTopRight(x, y, temp);
    openBottomRight(x, y, temp);
    openTopLeft(x, y, temp);
    openBottomLeft(x, y, temp);
  };

  const openLeft = (x, y, temp) => {
    let newY = y - 1;
    if (newY >= 0) {
      if (temp[x][newY].show === false) {
        temp[x][newY].show = true;
        if (temp[x][newY].surroundingMines === 0) {
          openSurrounding(x, newY, temp);
        }
      }
    }
  };
  const openRight = (x, y, temp) => {
    let newY = y + 1;

    if (newY <= 9) {
      if (temp[x][newY].show === false) {
        temp[x][newY].show = true;
        if (temp[x][newY].surroundingMines === 0) {
          openSurrounding(x, newY, temp);
        }
      }
    }
  };
  const openTop = (x, y, temp) => {
    let newX = x - 1;

    if (newX >= 0) {
      if (temp[newX][y].show === false) {
        temp[newX][y].show = true;
        if (temp[newX][y].surroundingMines === 0) {
          openSurrounding(newX, y, temp);
        }
      }
    }
  };
  const openBottom = (x, y, temp) => {
    let newX = x + 1;

    if (newX <= 9) {
      if (temp[newX][y].show === false) {
        temp[newX][y].show = true;

        if (temp[newX][y].surroundingMines === 0) {
          openSurrounding(newX, y, temp);
        }
      }
    }
  };
  const openTopRight = (x, y, temp) => {
    let newY = y + 1;
    let newX = x - 1;

    if (newX >= 0 && newY <= 9) {
      if (temp[newX][newY].show === false) {
        temp[newX][newY].show = true;
        if (temp[newX][newY].surroundingMines === 0) {
          openSurrounding(newX, newY, temp);
        }
      }
    }
  };
  const openBottomRight = (x, y, temp) => {
    let newY = y + 1;
    let newX = x + 1;

    if (newX <= 9 && newY <= 9) {
      if (temp[newX][newY].show === false) {
        temp[newX][newY].show = true;
        if (temp[newX][newY].surroundingMines === 0) {
          openSurrounding(newX, newY, temp);
        }
      }
    }
  };
  const openBottomLeft = (x, y, temp) => {
    let newY = y - 1;
    let newX = x + 1;

    if (newX <= 9 && newY >= 0) {
      if (temp[newX][newY].show === false) {
        temp[newX][newY].show = true;
        if (temp[newX][newY].surroundingMines === 0) {
          openSurrounding(newX, newY, temp);
        }
      }
    }
  };
  const openTopLeft = (x, y, temp) => {
    let newY = y - 1;
    let newX = x - 1;

    if (newX >= 0 && newY >= 0) {
      if (temp[newX][newY].show === false) {
        temp[newX][newY].show = true;
        if (temp[newX][newY].surroundingMines === 0) {
          openSurrounding(newX, newY, temp);
        }
      }
    }
  };

  const checkSquare = (id) => {
    let x = parseInt(id.substring(0, 1), 10);
    let y = parseInt(id.substring(1, 2), 10);
    let temp = [...board];
    let mines = mineCount;

    if (temp[x][y].flagged) {
      mines++;
    }

    temp[x][y].show = true;

    if (temp[x][y].mined) {
      setGameover(true);
    } else if (temp[x][y].surroundingMines === 0) {
      openSurrounding(x, y, temp);
    }

    setMineCount(mines);
    setBoard(temp);
  };

  const flagSquare = (id) => {
    let x = parseInt(id.substring(0, 1), 10);
    let y = parseInt(id.substring(1, 2), 10);
    let temp = [...board];
    let mines = mineCount;

    if (temp[x][y].flagged === true) {
      temp[x][y].flagged = false;
      mines++;
    } else {
      temp[x][y].flagged = true;
      mines--;
    }

    setMineCount(mines);
    setBoard(temp);
  };

  const resetGame = () => {
    setGameover(false);
    setCoor([]);
    setBoard(
      Array(10)
        .fill(0)
        .map((x) =>
          Array(10).fill({
            mined: false,
            surroundingMines: 0,
            show: false,
            flagged: false,
          })
        )
    );
    setMines(10);
  };

  useEffect(() => {
    setMines(10);
  }, []);

  return (
    <div className="container">
      {/* <div className="difficulty">
        <div
          onClick={() => {
            setMines(10);
          }}
        >
          Easy
        </div>
        <div
          onClick={() => {
            setDifficulty(2);
          }}
        >
          Intermediate
        </div>
        <div
          onClick={() => {
            setDifficulty(3);
          }}
        >
          Hard
        </div>
      </div> */}
      <div className={gameover ? "screen show" : "screen"}>
        <div className="title">Game Over </div>
        <div className="button" onClick={resetGame}>
          Reset{" "}
        </div>
      </div>

      <div className="Board">
        {board.map((row, i) => {
          return (
            <div key={i} className="row">
              {row.map((column, j) => {
                return (
                  <div key={j} className="column">
                    <Square
                      id={i + "" + j}
                      mined={board[i][j].mined}
                      show={board[i][j].show}
                      flagged={board[i][j].flagged}
                      surroundingMines={board[i][j].surroundingMines}
                      checkSquare={checkSquare}
                      flagSquare={flagSquare}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="counter">Mines Left : {mineCount}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
