import { createContext, useState } from "react";


export const UserContext = createContext();

export default function UserContextProvider(props) {

  const [userEmail, setUserEmail] = useState();


const [userEmailData,setUserEmailData] =useState({})


const [userData,setUserData] =useState({})

// console.log("createContext",userData);
  return (
    <UserContext.Provider value={{ userEmail, setUserEmail,userEmailData ,setUserEmailData,setUserData,userData }}>
        {props.children}
    </UserContext.Provider>
  );
}
