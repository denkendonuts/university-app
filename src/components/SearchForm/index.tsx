import type { FormData } from "@/utils/types";

import React, { useCallback, useState } from "react";

import countries from "@/utils/countries.json";

export const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("Canada");

  const handleClear = useCallback(() => {
    setSearchTerm("");
    setSelectedCountry("Canada");
    onSubmit({ searchTerm: "", selectedCountry: "Canada" });
  }, [onSubmit]);

  return (
    <form
      className="flex my-12 phone:flex-col flex-wrap phone:gap-4"
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit({ searchTerm, selectedCountry });
      }}
    >
      <input
        className="w-1/2 phone:w-auto phone:h-[44px] px-2 py-1 border border-gray-300 ml-2 rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for universities by name"
        value={searchTerm}
      />
      <select
        className="phone:h-[44px] tablet:max-w-[50%] px-2 py-1 border border-gray-300 rounded ml-2 flex-shrink"
        onChange={(e) => setSelectedCountry(e.target.value)}
        value={selectedCountry}
      >
        <option value="All">All Countries</option>
        {countries.map((country, i) => (
          <option key={country.name + i} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      <div>
        <button
          className="px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded ml-2"
          type="submit"
        >
          Search
        </button>

        <button
          className="px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded ml-2"
          onClick={handleClear}
          type="button"
        >
          Clear All Filters
        </button>
      </div>
    </form>
  );
};

type SearchFormProps = {
  onSubmit: (formData: FormData) => void;
};
