import { createContext, useState } from "react";

export const SocialAccountContext = createContext()
export const setSocialAcccountContext = createContext()

const SocialAccountProvider = ({children}) => {
    const [socailAccount, setSocialAccount] = useState()
    const setSocial = (social) => {
        setSocialAccount(social)
    }
    return (
        <SocialAccountContext.Provider value={socailAccount}>
            <setSocialAcccountContext.Provider value={setSocial}>
                {children}
            </setSocialAcccountContext.Provider>
        </SocialAccountContext.Provider>
    )
}
export default SocialAccountProvider