

// Define type for form data used in the SearchForm component
export type FormData = {
    searchTerm?: string;
    selectedCountry: string;
};

// Define type for Countries
export type CountriesTypes = {
    code: string;
    name: string;
};

// Define type for University
export type University = {
    alpha_two_code: string;
    country: string;
    domains: string[];
    name: string;
    "state-province": string;
    web_pages: string[];
};

// Define type for the fetch result
export type FetchResult = {
    performanceMetrics: {
        responseCode: number;
        timeTaken: number;
    };
    universities: University[];
};