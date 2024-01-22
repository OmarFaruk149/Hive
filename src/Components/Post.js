import React from "react";

export default function Post({ object }) {
  const isImageAvailable = (data) => {
    return data === "" ? false : true;
  };
  return (
    <div className="bg-gray-800 text-white mx-5 rounded-lg  mt-6">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={object.user_img}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="">
            <div className="font-semibold">{object.user_name}</div>
            <div className="text-gray-400 text-sm">
              Posted on January 1, 2024
            </div>
          </div>
        </div>
        <div className="mt-4">{object.description}</div>
        <div className="my-4">
          {isImageAvailable(object.post_img) ? (
            <img src={object.post_img} alt="" className="w-full" />
          ) : (
            <span></span>
          )}
        </div>
        <div className="mt-2 flex flex-row space-x-2">
          <div className="w-5 h-5 rounded-full">
            <img
              src="https://cdn-icons-png.flaticon.com/128/739/739231.png"
              alt="Like"
            />
          </div>
          <div className="">{object.Like_count}</div>
        </div>
        <div className="border-t-2 my-2"></div>
        <div className="flex items-center justify-center">
          <button className="flex items-center space-x-1">
            <div className="">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1062/1062675.png"
                alt="Like"
                className="w-6 h-6"
              />
            </div>
            <span className=" font-semibold">Like</span>
          </button>
        </div>
      </div>
    </div>
  );
}
