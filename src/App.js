import { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import Friends from "./Components/Friends";
import Login from "./Components/Login";
import Bg from "../src/images/img.jpg";
import Chat from "./Components/Chat";
import UserProfile from './Components/UserProfile'
import Board from "./Components/Games/Board";

function App() {
 
  const [isLogin, setLogin] = useState(false);
  const [value, setValue] = useState("SignUp");
  const [Pages, setPages] = useState({
    Home: <Home value={value} setValue={setValue} />,
    SignUp: <SignUp setLogin={setLogin} setValue={setValue} />,
    Login: <Login setLogin={setLogin} setValue={setValue} />,
    Friends: <Friends setValue={setValue} />,
    Navbar: <Navbar setValue={setValue} setLogin={setLogin} />,
    Chat: <Chat setValue={setValue} setLogin={setLogin} />,
    UserProfile: <UserProfile />,
    Games: <Board />
  });
  const [count, setCount] = useState(0);

  return (
    <>
    <div className=" bg-gray-700"
    >
      {isLogin ? (
        <>
          {" "}
          {Pages["Navbar"]} {Pages[value]}{" "}
        </>
      ) : (
        Pages[value]
      )}
    </div>
    
    </>
    
  );
}

export default App;
