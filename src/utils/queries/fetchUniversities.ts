import type { University } from "../types";

/**
 * Fetch universities from the API. If a country is provided, only universities from that country are fetched.
 * If a name is provided, only universities with that name are fetched.
 * 
 * @param country The country to fetch universities from
 * @param name The name of the university to fetch
 */
export const fetchUniversities = async (
    abortSignal: AbortSignal | null,
    country: string,
    name?: string
) => {
    let url = `http://universities.hipolabs.com/search?`;

    if (country !== "All") {
        url += `&country=${country}`;
    }

    if (name) {
        url += `&name=${name}`;
    }
    // Record start time
    const startTime = performance.now();

    const response = await fetch(url, { signal: abortSignal });

    // Record end time
    const endTime = performance.now();
    // Calculate time taken
    const timeTaken = endTime - startTime;

    if (!response.ok) {
        throw new Error("Failed to fetch universities.");
    }

    const data: University[] = await response.json();

    return {
        data,
        responseCode: response.status,
        timeTaken: timeTaken
    };
};