// BiographyContext.js

import React, { createContext, useState, useContext } from 'react';

const BiographyContext = createContext();

export function useBiography() {
  return useContext(BiographyContext);
}

export function BiographyProvider({ children }) {
  const [biography, setBiography] = useState({
    name: 'John Doe',
    dob: '01/01/1990',
    gender: 'Male',
    birthplace: 'New York',
    currentLocation: 'Los Angeles',
    nationality: 'American',
    workExperience: '5 years',
    workSchedule: '9 AM - 5 PM',
    additionalField: '',

  });

  const updateBiography = (newBiography) => {
    setBiography(newBiography);
  };

  return (
    <BiographyContext.Provider value={{ biography, updateBiography }}>
      {children}
    </BiographyContext.Provider>
  );
}
