import { useEffect, createContext, useState } from "react";

export const UserContext = createContext();

const initialState = null;

function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
}

function getLocalStorage(key, initialState) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialState;
  } catch (e) {
    return initialState;
  }
}

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() =>
    getLocalStorage("currentUser", initialState)
  );

  useEffect(() => {
    setLocalStorage("currentUser", currentUser);
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
