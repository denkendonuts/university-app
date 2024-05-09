"use client";
import type { University } from "@/utils/types.js";

import { useEffect } from "react";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const AppContext = createContext<AppContextType>({
  addToFavourites: () => {},
  favourites: [],
  removeFromFavourites: () => {},
});

const client = new QueryClient();

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<University[]>([]);

  // Function to add a university to the favourites in state
  const addToFavourites = useCallback((university: University) => {
    console.log(`Adding ${university.name} to favourites`);

    setFavourites((prevFavourites: University[]) => {
      const prevFavs = prevFavourites || [];
      const newFavs = [...prevFavs, university];

      // Update local storage with the new favourites
      localStorage.setItem("favourites", JSON.stringify(newFavs));

      return newFavs;
    });
  }, []);

  // Function to remove a university from the favourites in state
  const removeFromFavourites = useCallback((university: University) => {
    console.log(`Removing ${university.name} from favourites`);

    setFavourites((prevFavourites: University[]) => {
      const newFavs = prevFavourites.filter(
        (item: University) => item.name !== university.name
      );

      // Update local storage with the new favourites
      localStorage.setItem("favourites", JSON.stringify(newFavs));

      return newFavs;
    });
  }, []);

  // Effect to initialize the favourites state from local storage, executed only once when the component mounts
  useEffect(() => {
    const storedFavourites = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );
    console.log("Hydrating favourites from local storage:", storedFavourites);
    setFavourites(storedFavourites);
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      addToFavourites,
      favourites,
      removeFromFavourites,
    }),
    [favourites, addToFavourites, removeFromFavourites]
  );

  return (
    <QueryClientProvider client={client}>
      <AppContext.Provider value={value}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default Providers;

export type AppContextType = {
  addToFavourites: (university: University) => void;
  favourites: University[];
  removeFromFavourites: (university: University) => void;
};
