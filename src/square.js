import React, { useState } from "react";

export default function Square(props) {
  let id = props.id;
  let surroundingMines = props.surroundingMines;

  const check = (e) => {
    if (e.buttons === 1) {
      props.checkSquare(id);
    } else {
      props.flagSquare(id);
    }
  };

  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return (
    <div
      key={id}
      className={props.show ? (props.mined ? "box red" : "box green") : "box"}
      onMouseDown={check}
    >
      {props.show
        ? props.mined
          ? ""
          : props.surroundingMines
        : props.flagged
        ? "f"
        : ""}
    </div>
  );
}
