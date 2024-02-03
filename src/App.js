import { useState, useEffect } from "react";

import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import Friends from "./Components/Friends";
import Login from "./Components/Login";
import Bg from "../src/images/img.jpg";
import Chat from "./Components/Chat";
import UserProfile from "./Components/UserProfile";
import Board from "./Components/Games/Board";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-16 w-16"></div>
    </div>
  );
};
function App() {
  const [mail, setMail] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [value, setValue] = useState("");
  const [userDatabase, setDatabase] = useState({});
  const [loading, setLoading] = useState(true);

  const Location = collection(db, "/userProfileData");

  useEffect(() => {
    const unsubscribe = onSnapshot(Location, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDatabase(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const val = await getDocs(Location);
      console.log("valueeeeeee",val.docs)
      setDatabase(() => val.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();

    const authListener = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      if (user) {
        setMail(() => user.email);
        setLogin(user);
        setValue("Home");
        console.log("Logged in");
      } else {
        setLogin(() => false);
        // setValue(() => "SignUp");
        console.log("Logged out");
      }
    });

    return () => authListener();
  }, []);

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  const notun_data = userDatabase[0]
    ? userDatabase.filter((data) => data.email === mail)
    : [{ id: null }];
  
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
         <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-gray-700 h-full w-full bg-fixed login-form">
          {isLogin ? (
            <>
              <Navbar
                userDatabase={userDatabase}
                mail={mail}
                setLogin={setLogin}
                setValue={setValue}
                value={value}
              />
              {value === "UserProfile" ? (
                <UserProfile userDatabase={userDatabase} mail={mail} />
              ) : value === "Chat" ? (
                <Chat
                  userDatabase={userDatabase}
                  userId={notun_data[0] && notun_data[0].id ? notun_data[0].id : null}
                />
              ) : value === "Games" ? (
                <Board setValue={setValue} setLogin={setLogin} />
              ) : value === "Friends" ? (
                <Friends
                  userId={notun_data[0] && notun_data[0].id ? notun_data[0].id : null}
                  userDatabase={userDatabase}
                />
              ) : (
                <Home
                  userDatabase={userDatabase}
                  notun_data={notun_data[0]}
                  userId={notun_data[0] && notun_data[0].id ? notun_data[0].id : null}
                />
              )}
            </>
          ) : value === "Login" ? (
            <Login setValue={setValue} setLogin={setLogin} />
          ) : (
            !isLogin && <SignUp setLogin={setLogin} setValue={setValue} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
