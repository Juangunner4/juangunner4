import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [isWeb3, setIsWeb3] = useState(false);

  const toggleProfile = () => setIsWeb3((prev) => !prev);

  return (
    <ProfileContext.Provider value={{ isWeb3, toggleProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

