import {createContext, type ReactNode, useContext} from "react";
import { services, ServiceContainer } from "./ServiceContainer.ts";

const ServiceContext = createContext<ServiceContainer>(services);

interface ServiceProviderProps {
    children: ReactNode;
}

export const ServiceProvider = ({ children } : ServiceProviderProps) => {
    return (
    <ServiceContext.Provider value={services}>
        {children}
    </ServiceContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useServices = () => useContext(ServiceContext);