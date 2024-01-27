import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, where } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { isEmpty } from "lodash";

import { v4 } from "uuid";
import { query } from "firebase/database";

const provider = new GoogleAuthProvider();
const userRef = collection(db, "/userProfileData"); //database location where to add data of users

export const photoUpload = async (visited, setVisited, Image) => {
  try {
    if (visited) {
      return;
    }
    setVisited(true);
    const photoRef = ref(storage, `userProfileProto/${Image.name + v4()}`);
    await uploadBytes(photoRef, Image);
    const photolink = await getDownloadURL(photoRef);
    console.log("photo link created : " + photolink);
    return photolink; // shara jibon mone thakbe, sara rat khaise :( ei line ta shikhte, re-render er kaj return kore hoye gese, like useEffect
  } catch (e) {
    console.log(e);
    console.log("fucked up when upload photo");
  }
};
export const addUserData = async (data) => {
  try {
    let userData = {
      uid: data.uid,
      name: data.name,
      email: data.email,
      photo: data.photo,
    };
    await addDoc(userRef, userData);
    console.log("user data updated");
  } catch (error) {
    console.log("data couldn't updata");
  }
};

export const createAccount = async ({
  Image,
  acVisited,
  setAcVisited,
  visited,
  setVisited,
  userName,
  userMail,
  userPassword,
  setLogin,
  setValue,
}) => {
  // account create by email and password

  try {
    if (acVisited) {
      return;
    }
    setAcVisited(true);
    const photoLink = await photoUpload(visited, setVisited, Image);

    const userInfo = await createUserWithEmailAndPassword(
      auth,
      userMail,
      userPassword
    );
    const user = userInfo.user;
    let data = {
      uid: user.uid,
      name: userName,
      email: userMail,
      photo: photoLink,
    };
    await addUserData(data);
    console.log("createAccount called");
    setLogin(true);
    setValue("Home");
  } catch (e) {
    alert(e.message);
  }
};

export const signInWithGoogle = async ({ setValue, setLogin }) => {
  try {
    console.log("google auth start...");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userExists = await checkUserExists(user.email);
    if (userExists) {
      setValue("Home");
      setLogin(true);
      console.log("alrady have account");
      return;
    }
    const data = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };
    await addUserData(data);
    console.log("google data done");
  } catch (error) {
    console.log("google failed because of : ");
    console.log(error.message);
  }
};
const checkUserExists = async (email) => {
  const querySnapshot = await getDocs(
    collection(db, "/userProfileData"),
    where("email", "==", email)
  );
  return !isEmpty(querySnapshot.docs);
};

export const UserDataByUid = async (userUid) => {
  try {
    const userRef = collection(db, "userProfileData");
    const userQuery = query(userRef, where("uid", "==", userUid));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      const userData = await userSnapshot.docs[0].data();
      return userData;
    } else {
      console.log("no data found");
      return null;
    }
  } catch (error) {
    console.log("error on query");
    return null;
  }
};
