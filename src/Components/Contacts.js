import React from "react";
import "../Components/Login.css";

const Contacts = ({ userDatabase, userId }) => {
  const userData = userDatabase[0] ? userDatabase.filter((data) => data.id !== userId) : [null];

  return (
    <div className="py-6  login-form">
      <div className="text-xl font-semibold py-4">Contacts</div>
      <div>
        {userData[0] &&
          userData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-1 my-2 flex items-center space-x-2 hover:transform hover:scale-110 transition-transform duration-300 rounded-md"
            >
              <img src={item.photo} alt={item.name} className="w-8 h-8 p-1 rounded-full" />
              <div className="text-sm font-sans p-1">{item.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Contacts;
