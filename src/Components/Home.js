import PostContainer from "./PostContainer";
import Contacts from "./Contacts";
import React, { useState } from "react";
import Modal from "react-modal";
import dp from "../images/fb dp.jpg";
import image from "../images/image.svg";
import Popup from "./popUpPost";

export default function Home({notun_data}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isPopupOpen, setPopupOpen] = useState(false);

  

  return (
    <div className=" ">
      <div className="grid grid-cols-12 gap-12 pb-6">
        <div className="col-span-9 container ">
          <div className="bg-gray-800 p-4 mx-5 rounded-lg mt-6 ">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={dp}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full border-none hover:bg-slate-200 focus:outline-none rounded-lg h-8 px-2"
                onClick={()=>setPopupOpen(true)}
              />
            </div>
            <div className="border-t-2 my-2"></div>
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2"
                onClick={()=>setPopupOpen(true)}
              >
                <img
                  src={image}
                  title="picture icons"
                  alt="Photos/Videos"
                  className="h-6 w-6 bg-gray-500 rounded-lg "
                />
                <span className=" font-semibold text-white">Photos/Videos</span>
              </button>
            </div>
          </div>
          <Popup isOpen={isPopupOpen} onClose={()=>setPopupOpen(false)} notun_data={notun_data} />
          <div className="mx-auto mt-4">
            <PostContainer />
          </div>
        </div>
        {/* <div className="col-span-1 h-full"></div> */}
        <div className=" text-white font-thin col-span-3 mt-5 mr-5 px-6">
          <Contacts />
        </div>
      </div>
    </div>
  );
}
