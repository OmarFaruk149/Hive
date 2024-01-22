import React, { useState, useEffect } from "react";
import Post from "./Post";
import DP from "../images/fb dp.jpg";
import hamim from "../images/hamim.jpg";
import hamim_post from "../images/hamim_post.jpg";
import prottoy from "../images/prottoy.jpg";
import prottoy_post from "../images/prottoy_post.jpg";
import saif from "../images/saif.png";
import ragib from "../images/ragib.png";
import mahin from "../images/mahin.jpg";
import mahin_post from "../images/mahin_post.jpg";

import dp1 from "../images/dp1.jpg";
import dp2 from "../images/dp2.webp";
import dp3 from "../images/dp3.jpg";

import post1 from "../images/post1.jpg";
import post2 from "../images/post2.jpeg";
import post3 from "../images/post3.jpeg";
import post4 from "../images/post4.jpg";
import post5 from "../images/post5.jpg";
import post6 from "../images/post6.jpg";
import post7 from "../images/post7.jpg";
import post8 from "../images/post8.jpg";
import post9 from "../images/post9.jpg";

export default function PostContainer() {
  const [data, setData] = useState([]);

  const getData = () => {
    let json = [
      {
        post_ID: 1,
        user_ID: 123,
        user_img: hamim,
        user_name: "Albert Hamim",
        description: "Weather Demand ?",
        post_img: hamim_post,
        Like_count: 365,
      },
      {
        post_ID: 2,
        user_ID: 123,
        user_img: DP,
        user_name: "Omar Faruk",
        description: ".....................!",
        post_img: post1 ,
        Like_count: 204,
      },
      {
        post_ID: 3,
        user_ID: 123,
        user_img:ragib,
        user_name: "Ragib Hasan",
        description: "Across heaven and earth I alone am the honoured one",
        post_img: post2,
        Like_count: 747,
      },
      {
        post_ID: 1,
        user_ID: 123,
        user_img:mahin,
        user_name: "SK Mahin",
        description: "Alhamdulillah!! An award from honourable Prime Minister Sheikh Hasina.Creative Talent Hunt-2018 \n National award giving ceremony at Shapla Hall,Dhaka📡",
        post_img:mahin_post,
        Like_count: 3876,
      }, {
        post_ID: 7,
        user_ID: 1243,
        user_img:prottoy,
        user_name: "Prattoy Mondal",
        description: "Feeling Lonly :)",
        post_img:prottoy_post,
        Like_count: 503,
      },
      {
        post_ID: 93,
        user_ID: 1233,
        user_img:dp1,
        user_name: "Chanyeol",
        description: "Keep Smiling :)",
        post_img:post3,
        Like_count: 204,
      },
      {
        post_ID: 3,
        user_ID: 123,
        user_img:dp2,
        user_name: "Gojo",
        description: "Across heaven and earth I alone am the honoured one",
        post_img: post4,
        Like_count: 747,
      },
      {
        post_ID: 1,
        user_ID: 123,
        user_img:dp3,
        user_name: "John Doe",
        description: "Cherry Blossom",
        post_img:post5,
        Like_count: 365,
      },{
        post_ID: 2,
        user_ID: 123,
        user_img:dp1,
        user_name: "Chanyeol",
        description: ":)",
        post_img:post6,
        Like_count: 204,
      },
      {
        post_ID: 3,
        user_ID: 123,
        user_img:dp2,
        user_name: "Gojo",
        description: "Across heaven and earth I alone am the honoured one",
        post_img: post7,
        Like_count: 747,
      },
      {
        post_ID: 1,
        user_ID: 123,
        user_img:dp3,
        user_name: "John Doe",
        description: "Cherry Blossom",
        post_img:post8,
        Like_count: 365,
      },
      
      
    ];
    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      {data.map((item) => (
        <Post key={item.post_ID} object={item} />
      ))}
    </div>
  );
}
