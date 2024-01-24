import React, { useEffect, useState } from "react";
import ImageLayout from "./ImageLayout";
import DP from "../images/fb dp.jpg";
import {UserData} from "./UserDataFor";

export default function Contacts() {

  return (
    <div className="">
      <div className=" text-xl font-semibold py-4">Contacts</div>
      <div className="">
        {UserData.map((item) => (
          <ImageLayout object={item} />
        ))}
      </div>
    </div>
  );
}
