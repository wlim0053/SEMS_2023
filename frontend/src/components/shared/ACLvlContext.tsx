import { createContext, useState } from "react";

export interface Aclvl {
    user_access_level: string
}

type AclvlContextType = {
    aclvl: Aclvl;
    setAclvl: React.Dispatch<React.SetStateAction<Aclvl>>;
};

const iAclvlContextState = {
    aclvl: {user_access_level: ""},
    setAclvl: () => {}
}

const ACLvl = createContext<AclvlContextType>(iAclvlContextState);

export default ACLvl;