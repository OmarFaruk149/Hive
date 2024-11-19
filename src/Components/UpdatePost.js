import React, { useState } from "react";
import { imageUpload } from "./FirebaseOperations";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import UserProfile from "../images/up.svg";
import close from "../images/close.svg";

function UpdatePost({ isUpdateOpen, setIsUpdateOpen, postInfo, notun_data }) {
  const [newPostText, setNewPostText] = useState(postInfo.post_text);
  const [Image, setImage] = useState(postInfo.post_image);
  const [url, setUrl] = useState(null);

  const handlePost = async () => {
    let link = postInfo.post_image; 
    try {
      if (!postInfo.post_image && Image) {
        link = await imageUpload(Image, "post");
      }

      const postref = doc(db, `postContainer/${postInfo.post_id}`);
      await updateDoc(postref, {
        postText: newPostText,
        post_image: link,
        editedAt: new Date(),
      });
      console.log("text is: ",newPostText, "image: ", link)
      setIsUpdateOpen(false);
      setImage(null);
      setNewPostText("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      {isUpdateOpen && (
        <>
          <div
            className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 ${
              isUpdateOpen ? "block" : "hidden"
            }  login-form`}
          >
            {/* <div
                className="absolute inset-0 w-full h-full"
                onClick={setIsUpdateOpen(false)}
              ></div> */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-100 text-gray-700 p-4 rounded-lg shadow-md shadow-black">
                <div className="">
                  <button
                    className="absolute bg-gray-400 hover:bg-gray-300 rounded-full"
                    onClick={() => {
                      setIsUpdateOpen();
                      setImage(null);
                      setNewPostText("");
                    }}
                  >
                    <img
                      src={close}
                      alt=""
                      className="h-6 w-6 p-1 rounded-full"
                    />
                  </button>
                  <p className="text-center text-2xl font-semibold">
                    Update Post
                  </p>
                </div>

                <div className="my-2">
                  <hr className="w-full" />
                </div>

                <div className="Profile my-1  p-2 hover:bg-gray-700 hover:text-gray-100 rounded-lg">
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
                      {notun_data && notun_data.name ? notun_data.name : "Hive"}
                    </div>
                  </div>
                </div>
                <div className="">
                  <textarea
                    value={newPostText}
                    className="bg-gray-300 p-2 focus:outline-none rounded-md resize-none overflow-auto"
                    name=""
                    id=""
                    cols="40"
                    rows="10"
                    placeholder="What's on your mind ?"
                    onChange={(e) => setNewPostText(e.target.value)}
                  ></textarea>
                </div>
                {(Image || postInfo.post_mage) && (
                  <div className="">
                    <img
                      src={url || postInfo.post_image}
                      alt="Selected"
                      className="h-16 w-auto"
                    />
                  </div>
                )}
                <div className="">
                  <hr className="" />
                </div>
                <div>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className={`${
                      Image
                        ? " bg-cyan-400 hover:bg-cyan-500"
                        : " bg-gray-500 hover:bg-gray-400 text-white"
                    } p-1 my-1 flex justify-center content-center hover  rounded-md`}
                  >
                    {Image ? "Photo selected" : "Upload photo"}
                  </label>
                </div>
                <div className="flex justify-center bg-cyan-400 hover:bg-cyan-500 content-center rounded-md">
                  <button
                    className=" text-white px-4 py-2"
                    onClick={handlePost}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdatePost;
