import { createContext, useContext } from "react";

export const MeterIdContext = createContext();

export const MeterIdProvider = MeterIdContext.Provider

export default function useMeterId(){
    return useContext(MeterIdContext)
}