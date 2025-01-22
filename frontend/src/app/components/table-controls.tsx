import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface Props {
  totalPages: number; // Total number of pages
  currentPage: number; // Current active page
  handlePrevPage: () => void; // Function to navigate to the previous page
  handleNextPage: () => void; // Function to navigate to the next page
  filteredData: any; // Data being displayed in the table
}

export default function TableControls({
  currentPage,
  handlePrevPage,
  handleNextPage,
  filteredData,
  totalPages,
}: Props) {
  return (
    <div className="flex justify-between items-center px-6 py-3.5 bg-white border-t border-gray-300 max-sm:flex-col max-sm:gap-4">
      {/* Display the range of results and total count */}
      <div className="text-sm text-gray-700">
        Showing {(currentPage - 1) * 10 + 1} to{" "}
        {Math.min(currentPage * 10, filteredData.length)} of{" "}
        {filteredData.length} results
      </div>
      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <MdOutlineKeyboardArrowLeft
          size={20}
          className={`cursor-pointer ${
            currentPage === 1 ? "text-gray-400" : "text-black"
          }`}
          onClick={handlePrevPage}
        />
        {/* Display the current page number */}
        <button className="w-7 h-7 flex justify-center items-center text-base rounded-lg text-white bg-gray-700">
          {currentPage}
        </button>
        <MdOutlineKeyboardArrowRight
          size={20}
          className={`cursor-pointer ${
            currentPage === totalPages ? "text-gray-400" : "text-black"
          }`}
          onClick={handleNextPage}
        />
      </div>
    </div>
  );
}
