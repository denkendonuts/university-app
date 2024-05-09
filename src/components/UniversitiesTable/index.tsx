import type { University } from "@/utils/types";

import { useContext, useMemo, useState } from "react";

import { AppContext } from "@/app/providers";
import { FavouriteButton } from "@/components/UniversitiesTable/FavouriteButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const isClient = typeof window !== "undefined";

export const UniversitiesTable: React.FC<UniversitiesTableProps> = ({
  isError,
  isLoading,
  universities,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { favourites } = useContext(AppContext);

  // NOTE: !!!
  // this is fine becouse we store the fav'ed universities in the local storage, therefore
  // this table will never render server side, if we were to store the fav'ed universities in a
  // server side database, we would need to add additional logic to ensure we did not get server -> client checksum mismatches.
  const isMobile = isClient && window.innerWidth < 640;

  const placeholderText = isLoading
    ? "Loading..."
    : isError
    ? "Error fetching data"
    : "No universities found";

  const { getPageNumbers, totalPages, universitiesSliced } = useMemo(() => {
    // Number of items to display per page
    const itemsPerPage = isMobile ? 15 : 25;

    // Calculate total number of pages
    const totalPages = Math.ceil(universities.length / itemsPerPage);

    // Calculate start and end index of items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, universities.length);

    // Slice the universities array to display only the items for the current page
    const universitiesSliced = universities.slice(startIndex, endIndex);

    // Calculate the page numbers to display in the pagination section
    const getPageNumbers = () => {
      const numOfButtons = isClient && window.innerWidth < 640 ? 5 : 8;
      const totalPagesToShow = Math.min(totalPages, numOfButtons);
      const startPage =
        currentPage <= 4
          ? 1
          : Math.min(currentPage - 3, totalPages - totalPagesToShow + 1);
      return Array.from({ length: totalPagesToShow }, (_, i) => startPage + i);
    };

    return {
      endIndex,
      getPageNumbers,
      itemsPerPage,
      startIndex,
      totalPages,
      universitiesSliced,
    };
  }, [currentPage, universities, isMobile]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>State/Province</TableHead>
            <TableHead>Website</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        {universities.length < 1 || isLoading || isError ? (
          <TableCaption>{placeholderText}</TableCaption>
        ) : (
          <TableBody>
            {universitiesSliced.map((university, index) => {
              // this an expensive operation, best done outside this map function -- ideally memoized at the component level
              // time constraints have prevented me from doing so for this assignment
              const isFavourite = favourites?.some(
                (item) => item.name === university.name
              );

              return (
                <TableRow key={university.name + index}>
                  <TableCell className="font-medium">
                    {university.name}
                  </TableCell>
                  <TableCell>{university["state-province"]}</TableCell>
                  <TableCell>
                    <a
                      className="text-sm text-blue-500 hover:text-blue-700"
                      href={university.web_pages[0]}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {university.web_pages[0]}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <FavouriteButton
                      isFavourite={isFavourite}
                      university={university}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>

      {/* Pagination section */}
      <div className="flex mt-4 justify-center">
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </PaginationButton>

        {getPageNumbers().map((page) => (
          <button
            className={cn(
              "px-3 py-1 mr-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300",
              {
                "font-semibold border-2 border-gray-600 bg-white":
                  currentPage === page,
              }
            )}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </PaginationButton>
      </div>
    </div>
  );
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  children,
  disabled,
  onClick,
}) => (
  <button
    className="px-3 py-1 mr-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
type UniversitiesTableProps = {
  isError?: boolean;
  isLoading?: boolean;
  universities: University[];
};

type PaginationButtonProps = {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
};
