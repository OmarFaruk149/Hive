import React, { useEffect, useState } from "react";

export default function Contacts({ userDatabase, userId }) {
  const UserData = userDatabase[0]
    ? userDatabase.filter((data) => data.id !== userId)
    : [null];
  return (
    <div className="">
      <div className=" text-xl font-semibold py-4">Contacts</div>
      <div className="">
        {UserData[0] && UserData.map((item) => (
          <div className="bg-gray-800 p-1 my-2 flex flex-row space-x-2  hover:transform hover:scale-110 transition-transform duration-300 rounded-md">
            <div className="">
              <img
                src={item.photo}
                alt={item.name}
                className="w-8 h-8 p-1 rounded-full"
                key={item.id}
              />
            </div>
            <div className=" text-sm font-sans p-1">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
