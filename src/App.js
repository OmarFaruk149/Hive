import { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import Friends from "./Components/Friends";
import Login from "./Components/Login";
import Bg from "../src/images/img.jpg";
import Chat from "./Components/Chat";
import UserProfile from "./Components/UserProfile";
import Board from "./Components/Games/Board";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import dp from "./images/girl.jpg";
function App() {
  const [mail, setMail] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [value, setValue] = useState("");

  const [userDatabase, setDatabase] = useState({});
  useEffect(() => {
    const Location = collection(db, "/userProfileData");

    const getData = async () => {
      const val = await getDocs(Location);
      setDatabase(() => val.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMail(() => user.email);
        setLogin(user);
        setValue("Home");
        console.log("Logged in");
      } else {
        setLogin(user);
        setValue("SignUp");
        console.log("logged out");
      }
    });
    return () => unsubscribe();
  }, []);

  console.log(userDatabase[0]);
  const notun_data = userDatabase[0]
    ? userDatabase.filter((data) => data.email === mail)
    : [{ id: null }];


  return (
    <>
      <div className=" bg-gray-700 h-full w-full bg-fixed">
        {isLogin ? (
          <>
            {
              <Navbar
                userDatabase={userDatabase}
                mail={mail}
                setLogin={setLogin}
                setValue={setValue}
                value={value}
              />
            }
            {value == "UserProfile" ? (
              <UserProfile userDatabase={userDatabase} mail={mail} />
            ) : value == "Chat" ? (
              <Chat userDatabase={userDatabase} userId={notun_data[0].id} />
            ) : value == "Games" ? (
              <Board setValue={setValue} setLogin={setLogin} />
            ) : value == "Friends" ? (
              <Friends userId={notun_data[0].id} userDatabase={userDatabase} />
            ) : (
              <Home userDatabase={userDatabase} userId={notun_data[0].id} notun_data={notun_data[0]} />
            )}
          </>
        ) : value == "Login" ? (
          <Login setValue={setValue} setLogin={setLogin} />
        ) : (
          <SignUp setLogin={setLogin} setValue={setValue} />
        )}
      </div>
    </>
  );
}

export default App;
