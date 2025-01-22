import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface Props {
  totalPages: number;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  filteredData: any;
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
      <div className="text-sm text-gray-700">
        Showing {(currentPage - 1) * 10 + 1} to{" "}
        {Math.min(currentPage * 10, filteredData.length)} of{" "}
        {filteredData.length} results
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineKeyboardArrowLeft
          size={20}
          className={`cursor-pointer ${
            currentPage === 1 ? "text-gray-400" : "text-black"
          }`}
          onClick={handlePrevPage}
        />
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
