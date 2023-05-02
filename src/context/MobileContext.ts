import { createContext, Dispatch, SetStateAction } from "react";
import { BlogEntry, PostCategory } from "../types";

declare global {
    interface MobileContextProps {
        menuOpened: boolean;
        setMenuOpened: Dispatch<SetStateAction<boolean>>;
    }
}

const MobileContext = createContext<MobileContextProps>({
    menuOpened: false,
    setMenuOpened: () => {},
});

export default MobileContext;
