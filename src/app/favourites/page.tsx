"use client";
// for the purposes of the assigment I've de-opted for RSC compatability
// should this be for a production facing appliction where time was less of a constraint
// I would have for a solution that enables the application to leverage the benefits of RSC
// something like the latest apollo client or react-query

import { useContext } from "react";

import { AppContext } from "@/app/providers";
import { UniversitiesTable } from "@/components/UniversitiesTable";
import Link from "next/link";

const FavouritesPage = () => {
  const { favourites } = useContext(AppContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold my-12 text-center">
        Favourite Universities
      </h1>

      {favourites.length >= 1 ? (
        <UniversitiesTable universities={favourites || []} />
      ) : (
        <p className="flex justify-center p-24 flex-wrap">
          No favourited universities yet.{" "}
          <span>
            Go to the
            <Link className="px-1 text-blue-500 font-bold" href="/search">
              Search Page
            </Link>
            to add some!
          </span>
        </p>
      )}
    </div>
  );
};

export default FavouritesPage;
