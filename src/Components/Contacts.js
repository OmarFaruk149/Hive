import React, { useEffect, useState } from "react";
import ImageLayout from "./ImageLayout";
import DP from "../images/fb dp.jpg";

export default function Contacts() {
  const [data, setData] = useState([]);

  const getData = () => {
    let jsonData = [
      {
        user_img: DP,
        user_name: "Omar Faruk",
        key: 298,
      },

      {
        user_img: "https://pbs.twimg.com/media/F6khzrwXUAAvdxJ.jpg",
        user_name: "Lufy",
        key: 298,
      },
      {
        user_img: "https://pbs.twimg.com/media/F6khzrwXUAAvdxJ.jpg",
        user_name: "Nabil bin khalid",
        key: 298,
      },
      {
        user_img: "https://pbs.twimg.com/media/F6khzrwXUAAvdxJ.jpg",
        user_name: "Leo boss",
        key: 298,
      },
      {
        user_img: "https://pbs.twimg.com/media/F6khzrwXUAAvdxJ.jpg",
        user_name: "Hashira",
        key: 298,
      },
      {
        user_img: "https://pbs.twimg.com/media/F6khzrwXUAAvdxJ.jpg",
        user_name: "Roronoa Zoro",
        key: 298,
      },
    ];
    setData(jsonData);
  };
  useEffect(() => {
    getData();
  }, []); 

  return (
    <div className="">
      <div className=" text-xl font-semibold py-4">Contacts</div>
      <div className="">
        {data.map((item) => (
          <ImageLayout object={item} />
        ))}
      </div>
    </div>
  );
}
