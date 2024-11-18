import PostContainer from "./PostContainer";
import Contacts from "./Contacts";
import React, { useState } from "react";
import UserProfile from "../images/up.svg";
import image from "../images/image.svg";
import Popup from "./popUpPost";
import "../Components/Login.css";


export default function Home({ userDatabase, userId, notun_data }) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div className="  login-form">
      <div className="flex flex-row  h-screen fixed w-full bg-gray-100 pb-6">
      
        <section className="w-full lg:w-9/12 container overflow-auto">
          <div className="bg-gray-300 p-4 mx-5 rounded-lg mt-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={
                  notun_data && notun_data.photo
                    ? notun_data.photo
                    : UserProfile
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full border-none bg-gray-100 hover:bg-slate-200 focus:outline-none rounded-lg h-8 px-2"
                onClick={() => setPopupOpen(true)}
              />
            </div>
            <hr className="my-4 " />
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2"
                onClick={() => setPopupOpen(true)}
              >
                <img
                  src={image}
                  title="picture icons"
                  alt="Photos/Videos"
                  className="h-6 w-6 bg-gray-400 rounded-lg "
                />
                <span className=" font-semibold ">Photos/Videos</span>
              </button>
            </div>
          </div>
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            notun_data={notun_data}
          />
          <div className="mx-auto mb-6 ">
            <PostContainer notun_data={notun_data} unknown={"Home"} />
          </div>
        </section>

        <section className="hidden lg:block  font-thin w-3/12 my-5 px-6 overflow-y-scroll sticky right-0 ">
        <div className={`text-xl font-semibold py-2`}>Contacts  </div>
          <Contacts userDatabase={userDatabase} userId={userId}/>
        </section>
      </div>
    </div>
  );
}
