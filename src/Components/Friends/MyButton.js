import React from "react";

export default function MyButton(props) {
 
  return (
    <>
      <button
        className="bg-cyan-700 rounded-lg p-2 my-6 mx-2 hover:bg-cyan-600"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        {props.first}
      </button>
      <button
        className="bg-cyan-700 rounded-lg p-2 mx-2 my-6 hover:bg-cyan-600"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        {props.second}
      </button>
      <button
        className="bg-cyan-700 rounded-lg p-2 mx-2 my-6 hover:bg-cyan-600"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        Message
      </button>
    </>
  );
}
