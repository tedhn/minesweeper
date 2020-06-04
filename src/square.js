import React, { useState } from "react";

export default function Square(props) {
  let id = props.id;
  let coor = props.coor;
  let [checked, setChecked] = useState(false);
  let [mined, setMined] = useState(false);
  let [value, setValue] = useState("");

  const checkSquare = () => {
    setChecked(true);

    if (coor.includes(id)) {
      setMined(true);
    }

    setValue(checkSurrounding());
  };

  const checkSurrounding = () => {
    let x = parseInt(id.substring(0, 1), 10);
    let y = parseInt(id.substring(1, 2), 10);

    let totalMines = 0;

    totalMines += checkLeft(x, y);
    totalMines += checkRight(x, y);
    totalMines += checkBottom(x, y);
    totalMines += checkTop(x, y);
    totalMines += checkTopRight(x, y);
    totalMines += checkBottomRight(x, y);
    totalMines += checkTopLeft(x, y);
    totalMines += checkBottomLeft(x, y);

    if (totalmines === 0) {
      // open up the surroudning squares
    }

    return totalMines;
  };

  const checkLeft = (x, y) => {
    let newY = y - 1;
    let newID = x + "" + newY;

    if (newY < 0) {
      return 0;
    }

    if (coor.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkRight = (x, y) => {
    let newY = y + 1;
    let newID = x + "" + newY;

    if (newY > 9) {
      return 0;
    }

    if (coor.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkTop = (x, y) => {
    let newX = x - 1;
    let newID = newX + "" + y;

    if (newX < 0) {
      return 0;
    }

    if (coor.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkBottom = (x, y) => {
    let newX = x + 1;
    let newID = newX + "" + y;

    if (newX > 9) {
      return 0;
    }

    if (coor.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkTopRight = (x, y) => {
    let newY = y + 1;
    let newX = x - 1;

    let newID = newX + "" + newY;

    if (newX < 0 || newY > 9) {
      return 0;
    }
    if (coor.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkBottomRight = (x, y) => {
    let newY = y + 1;
    let newX = x + 1;

    let newID = newX + "" + newY;

    if (newX > 9 || newY > 9) {
      return 0;
    }
    if (coor.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkBottomLeft = (x, y) => {
    let newY = y - 1;
    let newX = x + 1;

    let newID = newX + "" + newY;
    if (newX > 9 || newY < 0) {
      return 0;
    }
    if (coor.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };
  const checkTopLeft = (x, y) => {
    let newY = y - 1;
    let newX = x - 1;

    let newID = newX + "" + newY;

    if (newX < 0 || newY < 0) {
      return 0;
    }
    if (coor.includes(newID)) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div
      className={checked ? (mined ? "box red" : "box green") : "box"}
      onClick={checkSquare}
    >
      {value}
    </div>
  );
}
