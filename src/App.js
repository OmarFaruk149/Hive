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
import { UserDataByUid } from "./Components/FirebaseOperations";

function App() {

  const setValue = (prop) =>{
    setPage(prop);
  }
 const setLogin = (val) =>{
  setLog(val);
 }
  const [currentUser, setCurrentUser] = useState("");
  const [isLogin, setLog] = useState(null);
  const [value, setPage] = useState(null);
  const [Pages, setPages] = useState({
    Home: <Home value={value} setValue={setValue} />,
    SignUp: <SignUp setLogin={setLogin} setValue={setValue} />,
    Login: <Login setLogin={setLogin} setValue={setValue} />,
    Friends: <Friends setValue={setValue} />,
    Navbar: (
      <Navbar userData={currentUser} setValue={setValue} setLogin={setLogin} />
    ),
    Chat: <Chat setValue={setValue} setLogin={setLogin} />,
    UserProfile: <UserProfile />,
    Games: <Board />,
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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

  return (
    <>
      <div className=" bg-gray-700">
        {isLogin ? (
          <>
            {Pages["Navbar"]} {Pages[value]}
          </>
        ) : (
          Pages[value]
        )}
      </div>
    </>
  );
}

export default App;
