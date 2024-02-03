import React, { useEffect, useState } from "react";
import "../Components/Login.css";
import ProfileIcon from "../images/profile.svg";
import NotificationIcon from "../images/notification.svg";
import SearchIcon from "../images/search.svg";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-16 w-16"></div>
    </div>
  );
};


export default function Chat({ userDatabase, userId }) {
  const [profile, setProfile] = useState(null);
  const idList = userDatabase[0]
    ? userDatabase.find((data) => data.id === userId)
    : null;
  const userData =
    idList && idList.friends
      ? userDatabase.filter((data) => idList.friends[data.id] === true)
      : [];

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending,setSending] = useState(false);

  const participants =
    profile !== null ? [userId, userData[profile].id].sort() : [];

  const chatRef = collection(db, "/chatList");
  const qRef = query(chatRef, where("participants", "==", participants));

  const sendMessage = async () => {
    const chatSnapshot = await getDocs(qRef);
    if (!chatSnapshot.empty) {
      const chatDoc = chatSnapshot.docs[0];
      const chatDocRef = doc(chatRef, chatDoc.id);
      await updateDoc(chatDocRef, {
        participants: participants,
        messages: arrayUnion({
          senderId: userId,
          message: message,
          time: new Date(),
        }),
        time: new Date(),
      });
    } else {
      await addDoc(chatRef, {
        participants: participants,
        messages: [
          {
            senderId: userId,
            message: message,
            time: new Date(),
          },
        ],
        time: new Date(),
      });
    }
    setMessage("");
    setSending(false);
  };

  useEffect(() => {
    if (userData.length > 0 && profile !== null) {
      const participants = [userId, userData[profile].id].sort();
      const qRef = query(chatRef, where("participants", "==", participants));
      const fetchData = onSnapshot(qRef, (snapshot) => {
        try {
          if (!snapshot.empty) {
            const data = snapshot.docs[0].data();
            if (data) {
              setMessages(data);
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      });
      return () => {
        fetchData();
      };
    }
  }, [profile]);

  return (
    <>
      <div className=" login-form flex flex-row text-white h-screen fixed w-full bg-gray-700 ">
        <div className="section-1 overflow-auto w-2/12 lg:w-3/12 border-r border-gray-800  login-form">
          <div className="sticky top-0 p-2 bg-gray-700">
            <h1 className="text-lg font-bold">Chat</h1>
          </div>
          <div className="User_list p-1">
            {userData.length > 0 ?
              userData.map((data, index) => (
                <div
                  className={`flex flex-col p-1 lg:flex-row items-center justify-center lg:items-start lg:justify-start hover:text-cyan-400 ${
                    profile === index
                      ? "bg-gray-800 text-cyan-400 rounded-lg"
                      : "hover:bg-gray-600 hover:rounded-lg"
                  }`}
                  onClick={() => setProfile(() => index)}
                  key={data.id}
                >
                  <section className="h-12 w-12 lg:h-14 lg:w-14">
                    <img
                      src={data.photo}
                      alt={data.name}
                      className={`rounded-full h-full w-full p-1`}
                    />
                  </section>

                  <section className="text-center md:text-left lg:text-left lg:p-2 ">
                    <div className="hidden sm:flex text-xs font-bold font-sans">
                      {data.name}
                    </div>
                    <div className="hidden lg:flex text-xs font-extralight text-gray-300">
                      Hi I'm using Hive.
                    </div>
                  </section>
                </div>
              )) :(
                <div className="">You don't have any friend to chat</div>
              )
            }
          </div>
        </div>
        <div className="section-2 login-form flex-1 overflow-y-auto w-6/12 ">
          {profile !== null ? (
            <>
              {" "}
              <div className="Navbar sticky top-0 bg-gray-700 border-b border-gray-800 w-full">
                <div className="Profile-section flex m-1 p-2 hover:text-cyan-500 hover:bg-gray-600 hover:rounded-lg w-1/3">
                  <img
                    src={userData[profile].photo}
                    alt={userData[profile].name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="py-2 px-1 mx-1 font-sans font-bold">
                    {userData[profile].name}
                  </div>
                </div>
              </div>
              <div className="profile flex justify-center content-center m-4 p-4">
                <div className="photo">
                  <img
                    src={userData[profile].photo}
                    alt={userData[profile].name}
                    className="rounded-full h-36 w-36"
                  />
                  <div className="font-bold text-center text-sm p-1">
                    {userData[profile].name}
                  </div>
                </div>
              </div>
              <div className="overflow-y-scroll flex-1 mb-20 md:mb-40">
                {loading && <p>Loading...</p>}
                {messages && messages.messages && (
                  <div className="">
                    {messages.messages.map((data, index) => (
                      <section key={index} className="Messages ">
                        {data.senderId === userId ? (
                          <div className={`flex justify-end space-x-1 m-1`}>
                            <div className=" bg-slate-600 rounded-lg p-1">
                              {data.message}
                            </div>
                            <img
                              src={idList.photo}
                              alt=""
                              className="flex justify-end items-end h-8 w-8 rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="flex justify-start space-x-1 m-1">
                            <img
                              src={userData[profile].photo}
                              alt=""
                              className="flex justify-start items-start h-8 w-8 rounded-full"
                            />
                            <div className="bg-slate-600 rounded-lg p-1">
                              {data.message}
                            </div>
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-center content-center">
                <div className="NavbarBottom fixed bottom-0 max-w-md md:w-full md:max-w-screen-sm p-2 ">
                  <form className="flex w-full">
                    <input
                      type="message"
                      value={message}
                      row="2"
                      className={`rounded-full resize-none w-full h-10 p-4 text-black focus:outline-none`}
                      placeholder="Type your message here"
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={sending}
                    />
                    <button
                      className={`${sending && "cursor-not-allowed opacity-50"} rounded-full m-1 bg-cyan-500 p-2`}
                      type="submit"
                      onClick={(e) => {
                        setSending(true);
                        e.preventDefault();
                        sendMessage();
                      }}
                      disabled={sending}
                    >
                     {sending ? "sending": "send"}
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>

        <div className="section-3 login-form hidden xl:block w-3/12 overflow-auto border-l border-gray-800 p-6">
          {profile !== null ? (
            <>
              <div className="flex flex-col justify-center content-center bg-gray-800 rounded-lg pt-6">
                <div className="flex justify-center content-center">
                  <img
                    src={userData[profile].photo}
                    alt={userData[profile].name}
                    className=" rounded-full p-1 h-20 w-20"
                  />
                </div>

                <div className="flex justify-center content-center font-bold text-lg font-mono p-1">
                  {userData[profile].name}
                </div>

                <div className="flex justify-center content-center p-4">
                  <div className="flex-1">
                    <button
                      className="h-10 w-10 bg-gray-600 hover:bg-gray-500 rounded-full"
                      onClick={(event) => event.preventDefault()}
                    >
                      <img src={ProfileIcon} alt="Profile" className="p-1" />
                    </button>
                    <div className="py-1 font-bold font-sans text-gray-100 text-xs ml-1">
                      Profile
                    </div>
                  </div>

                  <div className="flex-1">
                    <button
                      className="h-10 w-10 bg-gray-600 hover:bg-gray-500 rounded-full"
                      onClick={(event) => event.preventDefault()}
                    >
                      <img src={NotificationIcon} alt="Mute" className="p-1" />
                    </button>
                    <div className="ml-1 py-1 font-bold font-sans text-gray-100 text-xs">
                      Mute
                    </div>
                  </div>

                  <div className="flex-1">
                    <button
                      className="h-10 w-10 bg-gray-600 hover:bg-gray-500 rounded-full"
                      onClick={(event) => event.preventDefault()}
                    >
                      <img src={SearchIcon} alt="Search" className="p-1" />
                    </button>
                    <div className="py-1 font-bold font-sans text-gray-100 text-xs">
                      Search
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end of profile section */}
              <div className="w-full h-10 my-2 hover:text-cyan-500 hover:bg-gray-600 p-2 rounded-lg bg-gray-800">
                Media
              </div>
              <div className="w-full h-10 my-2 hover:text-cyan-500 p-2 hover:bg-gray-600 rounded-lg bg-gray-800">
                Report
              </div>
              <div className="w-full h-10 my-2 hover:text-cyan-500 p-2 hover:bg-gray-600 rounded-lg bg-gray-800">
                Block
              </div>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </>
  );
}
