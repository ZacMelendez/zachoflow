import React, { useState } from "react";
import MobileContext from "../context/MobileContext";

function MobileContextProvider({ children }: { children: any }) {
    const [menuOpened, setMenuOpened] = useState<boolean>(false);

    return (
        <MobileContext.Provider
            value={{
                menuOpened,
                setMenuOpened,
            }}
        >
            {children}
        </MobileContext.Provider>
    );
}

export default MobileContextProvider;
