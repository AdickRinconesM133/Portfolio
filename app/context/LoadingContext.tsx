'use client';

import { createContext, useContext, useState, type ReactNode } from "react";

interface LoadingContextValue {
    isLoading: boolean;
    loadingComplete: () => void;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);

    const loadingComplete = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, loadingComplete }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
