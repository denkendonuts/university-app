"use client";
// for the purposes of the assigment I've de-opted for RSC compatability
// should this be for a production facing appliction where time was less of a constraint
// I would have for a solution that enables the application to leverage the benefits of RSC
// something like the latest apollo client or react-query

import type { FormData } from "@/utils/types";

import { useMemo, useState } from "react";

import { SearchForm } from "@/components/SearchForm";
import { UniversitiesTable } from "@/components/UniversitiesTable";
import { fetchUniversities } from "@/utils/queries/fetchUniversities";
import { useQuery } from "@tanstack/react-query";

const PERCENTILE_MIN_REQUESTS = 3;

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("Canada");

  // Track response times for performance monitoring, only keep the last 10
  const [responseTimes, setResponseTimes] = useState<number[]>([]);

  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: async ({ signal }) => {
      const response = await fetchUniversities(
        signal,
        selectedCountry,
        searchText
      );

      if (response.timeTaken) {
        setResponseTimes((prev) => {
          const newTimes = [...prev, response.timeTaken];

          // Only keep the last 10 response times
          if (newTimes.length > 10) {
            newTimes.shift();
          }

          return newTimes;
        });
      }

      return response;
    },
    queryKey: ["universities", searchText, selectedCountry],
  });

  const p90ResponseTime = useMemo(() => {
    // Only calculate 90th percentile if we have at least 5 response times
    if (responseTimes.length < PERCENTILE_MIN_REQUESTS) return null;

    const sortedTimes = responseTimes.sort((a, b) => a - b);
    const index = Math.floor(sortedTimes.length * 0.9);

    return sortedTimes[index];
  }, [responseTimes]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-4xl font-semibold my-16 text-center">
          Search Universities
        </h1>
        <div className="bg-indigo-300 rounded p-6 w-max space-y-3">
          <h3 className="text-lg font-bold">API Performance Tracking</h3>

          <div>
            <b>LATEST REQUEST:</b>
            <p>Response Code: {data?.responseCode}</p>
            <p>Response Time: {data?.timeTaken?.toFixed(2)} ms</p>
          </div>

          <div>
            <b>
              90th PERCENTILE (LAST 10 REQUESTS -- MIN {PERCENTILE_MIN_REQUESTS}
              ):
            </b>
            {p90ResponseTime === null ? (
              <p>
                Not enough data to calculate 90th percentile, make{" "}
                {`${PERCENTILE_MIN_REQUESTS - responseTimes.length}`} more
                requests
              </p>
            ) : (
              <p>Response Time: {p90ResponseTime?.toFixed(2)} ms</p>
            )}
          </div>
        </div>
      </div>

      <SearchForm
        onSubmit={({ searchTerm, selectedCountry }: FormData) => {
          setSelectedCountry(selectedCountry);
          setSearchText(searchTerm || "");
          refetch();
        }}
      />

      <UniversitiesTable
        isError={isError}
        isLoading={isLoading}
        universities={data?.data || []}
      />
    </div>
  );
};

export default SearchPage;
