import { useState, createContext } from "react";

export const Context = createContext({
  user: {},
  setUser: () => {},
});

export const ContextProvider = (props) => {
  const [user, setUser] = useState({});
  const value = { user, setUser };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
