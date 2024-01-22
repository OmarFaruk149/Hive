import PostContainer from "./PostContainer";
import Contacts from "./Contacts";
import React, { useState } from "react";
import Modal from "react-modal";
import dp from "../images/fb dp.jpg"
import image from "../images/image.svg"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
              />
            </div>
            <div className="border-t-2 my-2"></div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2">
                <img
                  src={image}
                  title="picture icons"
                  alt="Photos/Videos"
                  className="h-6 w-6 bg-gray-500 rounded-lg "
                  onClick={handleButtonClick}
                />
                <span className=" font-semibold text-white">Photos/Videos</span>
              </button>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="File Input Modal"
                ariaHideApp={false} // Disable the app element warning
              >
                <div>
                  <h2>Choose a File</h2>
                  <input
                    type="file"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                  />
                  <p>
                    Selected File: {selectedFile ? selectedFile.name : "None"}
                  </p>
                  {selectedFile && (
                    <>
                      {selectedFile.type.startsWith("image/") && (
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Selected"
                        />
                      )}
                      {selectedFile.type.startsWith("video/") && (
                        <video width="320" height="240" controls>
                          <source
                            src={URL.createObjectURL(selectedFile)}
                            type={selectedFile.type}
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </>
                  )}
                  <button onClick={handleCloseModal}>Close</button>
                </div>
              </Modal>
            </div>
          </div>
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
