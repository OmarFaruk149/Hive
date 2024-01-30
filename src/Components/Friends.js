import React from "react";

export default function Friends({ userDatabase, userId }) {
  const userData = userDatabase[0]
    ? userDatabase.filter((data) => data.id !== userId)
    : [null];

  return (
    <div className="flex flex-row text-white h-screen w-full bg-gray-700">
      <section className="Section-1 w-6/12 p-2 flex-1">
        <div className="Friend">
          {userData.map((data, index) => (
            <div className="p-5 m-6 text-white rounded-lg bg-gray-800 w-8/12 ">
              <div className="flex">
                <img
                  src={data.photo}
                  alt={data.name}
                  className="rounded-full h-16 w-16"
                />
                <div className="">
                  <h1 className="avatar text-lg font-bold mx-2">{data.name}</h1>
                  <div className="mx-2 mb-2">Connects: {"NaN"}</div>
                </div>
              </div>
              <div className="flex">
                <button
                  className="bg-cyan-700 rounded-lg p-2 my-6 mx-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="">Add+</div>
                </button>
                <button
                  className="bg-cyan-700 rounded-lg p-2 my-6 mx-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="">Profile</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="Section-2"></section>
    </div>
  );
}
