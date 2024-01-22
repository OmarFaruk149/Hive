import React, { useState, useEffect } from "react";
import Post from "./Post";
import MyCover from "../images/IMG_20231128_184731-01.jpeg";
import DP from "../images/fb dp.jpg";

export default function PostContainer() {
  const [data, setData] = useState([]);

  const getData = () => {
    let json = [
      {
        post_ID: 1,
        user_ID: 123,
        user_img:
          "https://i.pinimg.com/736x/07/eb/9b/07eb9b67b257d508317dd7f83cd43a27.jpg",
        user_name: "John Doe",
        description: "Cherry Blossom",
        post_img:
          "https://images.squarespace-cdn.com/content/v1/5ae6eda77e3c3a355f92cc88/8bcc05d1-cced-46b1-81ac-7ff336d4cb22/April+evening+in+Kyoto.+Credit+Japan+Rail.jpeg",
        Like_count: 365,
      },
      {
        post_ID: 2,
        user_ID: 123,
        user_img: DP,
        user_name: "Omar Faruk",
        description: "Library is the place where sounds are locked by words!",
        post_img: MyCover,
        Like_count: 204,
      },
      {
        post_ID: 3,
        user_ID: 123,
        user_img:
          "https://pics.craiyon.com/2023-10-21/3a95f47af61a425098c85f40c702f053.webp",
        user_name: "Gojo",
        description: "Across heaven and earth I alone am the honoured one",
        post_img: "",
        Like_count: 747,
      },
      {
        post_ID: 1,
        user_ID: 123,
        user_img:
          "https://i.pinimg.com/736x/07/eb/9b/07eb9b67b257d508317dd7f83cd43a27.jpg",
        user_name: "John Doe",
        description: "Cherry Blossom",
        post_img:
          "https://images.squarespace-cdn.com/content/v1/5ae6eda77e3c3a355f92cc88/8bcc05d1-cced-46b1-81ac-7ff336d4cb22/April+evening+in+Kyoto.+Credit+Japan+Rail.jpeg",
        Like_count: 365,
      },
      {
        post_ID: 2,
        user_ID: 123,
        user_img:
          "https://i1.sndcdn.com/avatars-000267690351-kllfdq-t500x500.jpg",
        user_name: "Chanyeol",
        description: "Blue Oblivion",
        post_img:
          "https://i.pinimg.com/474x/a6/ff/34/a6ff34d93aba6ca2f19d273b02027e79.jpg",
        Like_count: 204,
      },
      {
        post_ID: 3,
        user_ID: 123,
        user_img:
          "https://pics.craiyon.com/2023-10-21/3a95f47af61a425098c85f40c702f053.webp",
        user_name: "Gojo",
        description: "Across heaven and earth I alone am the honoured one",
        post_img: "",
        Like_count: 747,
      },
      {
        post_ID: 1,
        user_ID: 123,
        user_img:
          "https://i.pinimg.com/736x/07/eb/9b/07eb9b67b257d508317dd7f83cd43a27.jpg",
        user_name: "John Doe",
        description: "Cherry Blossom",
        post_img:
          "https://images.squarespace-cdn.com/content/v1/5ae6eda77e3c3a355f92cc88/8bcc05d1-cced-46b1-81ac-7ff336d4cb22/April+evening+in+Kyoto.+Credit+Japan+Rail.jpeg",
        Like_count: 365,
      },
      {
        post_ID: 2,
        user_ID: 123,
        user_img:
          "https://i1.sndcdn.com/avatars-000267690351-kllfdq-t500x500.jpg",
        user_name: "Chanyeol",
        description: "Blue Oblivion",
        post_img:
          "https://i.pinimg.com/474x/a6/ff/34/a6ff34d93aba6ca2f19d273b02027e79.jpg",
        Like_count: 204,
      },
      {
        post_ID: 3,
        user_ID: 123,
        user_img:
          "https://pics.craiyon.com/2023-10-21/3a95f47af61a425098c85f40c702f053.webp",
        user_name: "Gojo",
        description: "Across heaven and earth I alone am the honoured one",
        post_img: "",
        Like_count: 747,
      },
      {
        post_ID: 1,
        user_ID: 123,
        user_img:
          "https://i.pinimg.com/736x/07/eb/9b/07eb9b67b257d508317dd7f83cd43a27.jpg",
        user_name: "John Doe",
        description: "Cherry Blossom",
        post_img:
          "https://images.squarespace-cdn.com/content/v1/5ae6eda77e3c3a355f92cc88/8bcc05d1-cced-46b1-81ac-7ff336d4cb22/April+evening+in+Kyoto.+Credit+Japan+Rail.jpeg",
        Like_count: 365,
      },
      {
        post_ID: 2,
        user_ID: 123,
        user_img:
          "https://i1.sndcdn.com/avatars-000267690351-kllfdq-t500x500.jpg",
        user_name: "Chanyeol",
        description: "Blue Oblivion",
        post_img:
          "https://i.pinimg.com/474x/a6/ff/34/a6ff34d93aba6ca2f19d273b02027e79.jpg",
        Like_count: 204,
      },
      {
        post_ID: 3,
        user_ID: 123,
        user_img:
          "https://pics.craiyon.com/2023-10-21/3a95f47af61a425098c85f40c702f053.webp",
        user_name: "Gojo",
        description: "Across heaven and earth I alone am the honoured one",
        post_img: "",
        Like_count: 747,
      },
      {
        post_ID: 1,
        user_ID: 123,
        user_img:
          "https://i.pinimg.com/736x/07/eb/9b/07eb9b67b257d508317dd7f83cd43a27.jpg",
        user_name: "John Doe",
        description: "Cherry Blossom",
        post_img:
          "https://images.squarespace-cdn.com/content/v1/5ae6eda77e3c3a355f92cc88/8bcc05d1-cced-46b1-81ac-7ff336d4cb22/April+evening+in+Kyoto.+Credit+Japan+Rail.jpeg",
        Like_count: 365,
      },
      {
        post_ID: 2,
        user_ID: 123,
        user_img:
          "https://i1.sndcdn.com/avatars-000267690351-kllfdq-t500x500.jpg",
        user_name: "Chanyeol",
        description: "Blue Oblivion",
        post_img:
          "https://i.pinimg.com/474x/a6/ff/34/a6ff34d93aba6ca2f19d273b02027e79.jpg",
        Like_count: 204,
      },
      {
        post_ID: 3,
        user_ID: 123,
        user_img:
          "https://pics.craiyon.com/2023-10-21/3a95f47af61a425098c85f40c702f053.webp",
        user_name: "Gojo",
        description: "Across heaven and earth I alone am the honoured one",
        post_img: "",
        Like_count: 747,
      },
      {
        post_ID: 1,
        user_ID: 123,
        user_img:
          "https://i.pinimg.com/736x/07/eb/9b/07eb9b67b257d508317dd7f83cd43a27.jpg",
        user_name: "John Doe",
        description: "Cherry Blossom",
        post_img:
          "https://images.squarespace-cdn.com/content/v1/5ae6eda77e3c3a355f92cc88/8bcc05d1-cced-46b1-81ac-7ff336d4cb22/April+evening+in+Kyoto.+Credit+Japan+Rail.jpeg",
        Like_count: 365,
      },
      {
        post_ID: 2,
        user_ID: 123,
        user_img:
          "https://i1.sndcdn.com/avatars-000267690351-kllfdq-t500x500.jpg",
        user_name: "Chanyeol",
        description: "Blue Oblivion",
        post_img:
          "https://i.pinimg.com/474x/a6/ff/34/a6ff34d93aba6ca2f19d273b02027e79.jpg",
        Like_count: 204,
      },
      {
        post_ID: 3,
        user_ID: 123,
        user_img:
          "https://pics.craiyon.com/2023-10-21/3a95f47af61a425098c85f40c702f053.webp",
        user_name: "Gojo",
        description: "Across heaven and earth I alone am the honoured one",
        post_img: "",
        Like_count: 747,
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
