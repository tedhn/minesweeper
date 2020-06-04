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
  const timeline = gsap.timeline();

  let board = Array(10)
    .fill(0)
    .map((x) => Array(10).fill(0));

  let [coor, setCoor] = useState([]);

  const setMines = (num) => {
    let total = num;
    let mines = [...coor];
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
  };

  useEffect(() => {
    setMines(10);
  }, []);

  return (
    <div className="Board">
      {board.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((column, j) => {
              return (
                <div key={j} className="column">
                  <Square
                    id={i + "" + j}
                    mines={true}
                    checked={true}
                    coor={coor}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
