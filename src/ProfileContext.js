import React, { createContext, useContext, useState } from 'react';

export const ProfileContext = createContext({
  isWeb3: false,
  toggleProfile: () => {},
  setProfile: () => {},
});

export const ProfileProvider = ({ children }) => {
  const [isWeb3, setIsWeb3] = useState(false);

  const toggleProfile = () => setIsWeb3((prev) => !prev);
  const setProfile = (value) => setIsWeb3(Boolean(value));

  return (
    <ProfileContext.Provider value={{ isWeb3, toggleProfile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

