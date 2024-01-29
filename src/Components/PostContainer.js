import React, { useState, useEffect } from "react";
import Post from "./Post";
import { fetchData } from "./FirebaseOperations";




export default function PostContainer() {
  const [Data, setData] = useState(); // Use empty array as the initial state
  useEffect(() => {
    fetchData({ setData });
  }, []);

  // console.log("final", Data);
  return (
    <div className="">
      {Data &&
        Data.flat().map((item, value) => (
          <Post
            user_image={item.data.user_image}
            post_image={item.data.post_image}
            user_name={item.data.user_name}
            postText={item.data.postText}
            uploadTime={"janina"}
          />
        ))}
    </div>
  );
}
