// BiographyContext.js

import React, { createContext, useState, useContext } from 'react';

const PersonalContext = createContext();

export function usePersonal() {
  return useContext(PersonalContext);
}

export function PersonalProvider({ children }) {
  const [personal, setPersonal] = useState({
    name: 'Johne',
    dob: '01/01/1990',
    gender: 'Male',
    birthplace: 'New York',
   

  });

  const updatePersonal = (newPersonal) => {
    setPersonal(newPersonal);
  };

  return (
    <PersonalContext.Provider value={{ personal, updatePersonal }}>
      {children}
    </PersonalContext.Provider>
  );
}
