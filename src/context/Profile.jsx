import { createContext, useState } from "react";

export const ProfileContext = createContext()
export const setProfileContext = createContext()

const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState()
    const updateProfile = (profileDeatils) => {
        setProfile(profileDeatils)
    }
    return (
        <ProfileContext.Provider value={profile}>
            <setProfileContext.Provider value={updateProfile}>
                {children}
            </setProfileContext.Provider>
        </ProfileContext.Provider>
    )
}
export default ProfileProvider