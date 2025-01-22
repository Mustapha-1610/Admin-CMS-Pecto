import { useState } from "react";

// Custom hook to handle pagination
export const usePagination = (data: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage); // Calculate total number of pages
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage, // Get data for the current page
    currentPage * itemsPerPage
  );

  // Handle next page button click
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Handle previous page button click
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return {
    currentPage,
    totalPages,
    currentData,
    handleNextPage,
    handlePrevPage,
  };
};
