import { createContext, useState } from "react";

export interface User {
    uid: string
    email: string
    name: string
}

type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const iUserContextState = {
    user: {uid: "", email: "", name: ""},
    setUser: () => {}
}

const UserContext = createContext<UserContextType>(iUserContextState);


export default UserContext;
