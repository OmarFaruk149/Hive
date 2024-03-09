import React from "react";

export default function Square({ value, onSquarClick }) {
  return (
    <div className="square">
      <button
        className="border-2 bg-gray-900 rounded-xl m-1 p-8 text-white bg-fixed h-8 w-8"
        onClick={onSquarClick}
      >
        {value}
      </button>
    </div>
  );
}
