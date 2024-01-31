import React, { useEffect, useState } from "react";
import UserProfile from "../images/up.svg";
import upload from "../images/upload.svg";
import close from "../images/close.svg";
import { fetchData, imageUpload } from "./FirebaseOperations";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "../Components/Login.css";

const Popup = ({ isOpen, onClose, notun_data }) => {
  const [postText, setPostText] = useState("");
  const [Image, setImage] = useState(null);
  const dbRef = collection(db, "/postContainer");

  let link = null;
  const handlePost = async () => {
    if (Image) {
      try {
        link = await imageUpload(Image, "post");
        setImage(null);
        console.log("uploaded image " + link);
        console.log("upload success! ");
      } catch (error) {
        console.error("image not uploaded ", error);
      }
    }

    try {
      await addDoc(dbRef, {
        uploadTime: serverTimestamp(),
        uid: notun_data.id,
        postText: postText,
        post_image: link,
        user_name: notun_data.name,
        user_mail: notun_data.email,
        user_image: notun_data.photo,
        like_count: 0,
        liked_by: [],
      });

      console.log("data uploaded successfuly!!!");
      link = null;
    } catch (error) {
      console.error("not upload post data , because of ", error);
    }
    onClose();
  };
console.log(notun_data)
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}  login-form`}>
      <div
        className="absolute inset-0 bg-gray-400 opacity-75"
        onClick={onClose}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gray-600 text-gray-200 p-4 rounded-md">
          <div className="">
            <button
              className="absolute bg-gray-400 hover:bg-gray-300 rounded-full"
              onClick={onClose}
            >
              <img src={close} alt="" className="h-6 w-6 p-1 rounded-full" />
            </button>
            <p className="text-center text-2xl font-semibold">Create post</p>
          </div>

          <div className="my-2">
            <hr className="w-full" />
          </div>

          <div className="Profile my-1  p-2 hover:bg-gray-700 rounded-lg">
            <div className="flex">
              <img
                src={
                  notun_data && notun_data.photo
                    ? notun_data.photo
                    : UserProfile
                }
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <div className="p-1">
                {notun_data && notun_data.name
                  ? notun_data.name
                  : "Hive"}
              </div>
            </div>
          </div>
          <div className="">
            <textarea
              value={postText}
              className="bg-gray-500 p-2 focus:outline-none rounded-md resize-none overflow-auto"
              name=""
              id=""
              cols="45"
              rows="10"
              placeholder="What's on your mind ?"
              onChange={(e) => setPostText(e.target.value)}
            ></textarea>
          </div>
          <div className="">
            <hr className="" />
          </div>
          <div>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label
              htmlFor="fileInput"
              className="p-1 my-1 flex justify-center content-center hover bg-gray-500 hover:bg-gray-400 rounded-md"
            >
              {Image ? "Photo selected" : "Upload photo"}
            </label>
          </div>
          <div className="flex justify-center bg-cyan-400 hover:bg-cyan-500 content-center rounded-md">
            <button className=" text-white px-4 py-2" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
