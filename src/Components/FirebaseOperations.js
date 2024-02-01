import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  where,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
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
    console.log("error when upload photo");
  }
};
export const addUserData = async (data) => {
  try {
    let userData = {
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
    let photoLink = "https://shorturl.at/anuCW";
    if(Image){
      photoLink = await photoUpload(visited, setVisited, Image);
    }

    const userInfo = await createUserWithEmailAndPassword(
      auth,
      userMail,
      userPassword
    );
    const user = userInfo.user;
    let data = {
      name: userName ? userName : "Hive User",
      email: userMail,
      photo: photoLink,
    };
    await addUserData(data);
    console.log("createAccount called");
    setLogin(true);
    setValue("Home");
    return userMail;
  } catch (e) {
    alert(e.message);
  }
};

export const signInWithGoogle = async ({ setValue, setLogin }) => {
  try {
    await signOut(auth);
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log(user.email);

    const userExists = await checkUserExists(user.email);
    if (userExists) {
      setValue("Home");
      setLogin(true);
      console.log("alrady have account");
      console.log(user.email);
      return user.email;
    }
    const data = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL ? user.photoURL : null,
    };
    await addUserData(data);
    console.log("google data done");
    return user.email;
  } catch (error) {
    console.log("google failed because of : ");
    console.log(error.message);
    const result = await signInWithRedirect(auth,provider);
    const user = result.user;

    console.log(user.email);

    const userExists = await checkUserExists(user.email);
    if (userExists) {
      setValue("Home");
      setLogin(true);
      console.log("alrady have account");
      console.log(user.email);
      return user.email;
    }
    const data = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL ? user.photoURL : null,
    };
    await addUserData(data);
    console.log("google data done");
    return user.email;

  }
};
const checkUserExists = async (email) => {
  const userRef = collection(db, "userProfileData");
  const q = query(userRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);
  const val = querySnapshot.docs;
  return !isEmpty(val);
};

export const updateUserData = async (userUid, newData) => {
  const userDocRef = doc(db, "userProfileData", userUid);
  try {
    await updateDoc(userDocRef, newData);
    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data:", error.message);
  }
};

export const imageUpload = async (Image, Type) => {
  try {
    const imageRef = ref(storage, `${Type}/${Image.name + v4()}`);
    console.log("uploading...");
    await uploadBytes(imageRef, Image);
    console.log("uploaded");
    const ImageLink = await getDownloadURL(imageRef);
    console.log("Image uploaded for " + Type);
    return ImageLink;
  } catch (err) {
    console.log("image not uploaded for" + Type);
  }
};

export const addPhotoOrCover = async (userUid, type, newUrl) => {
  const userDocRef = doc(db, "userProfileData", userUid);
  try {
    await setDoc(userDocRef, { [type]: [newUrl] }, { merge: true });
    console.log(`${type} added successfully`);
  } catch (error) {
    console.error("Error adding photo or cover:", error.message);
  }
};
