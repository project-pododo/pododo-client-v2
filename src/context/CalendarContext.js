import React, { createContext, useState, useContext } from "react";

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSideVisible, setIsSideVisible] = useState(true);

  const openFormWithDate = (date) => {
    setSelectedDate(date);
    setIsSideVisible(true);
  };

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        isSideVisible,
        setIsSideVisible,
        openFormWithDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
