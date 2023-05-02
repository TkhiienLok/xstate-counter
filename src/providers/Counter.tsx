import React, { createContext, useContext } from "react";
import { useInterpret } from "@xstate/react";
import counterMachine from "../machines/counter";

export const CounterStateContext = createContext({});

export const CounterStateProvider = (props: { children: React.ReactNode }) => {
  const authService = useInterpret(counterMachine);

  return (
    <CounterStateContext.Provider value={{ authService }}>
      {props.children}
    </CounterStateContext.Provider>
  );
};

export const useCounter = () => useContext(CounterStateContext);
