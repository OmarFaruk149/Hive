import React from 'react'

export default function ImageLayout({object}) {
  return (
    <div className="bg-gray-800 p-1 my-2 flex flex-row space-x-2  hover:transform hover:scale-110 transition-transform duration-300 rounded-md">
        <div className="">
            <img src={object.image} alt="" className="w-8 h-8 p-1 rounded-full" key={object.post_ID}/>
        </div>
        <div className=" text-sm font-sans p-1">
            {object.name}
        </div>
    </div>
  )
}
