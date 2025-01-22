"use client";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaFileSignature } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import EditEntryModal, { FormData } from "./components/edit-entry-modal";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [fetchData, setFetchData] = useState<boolean>(true);

  useEffect(() => {
    async function fetchWords() {
      const response = await fetch("http://localhost:5000/api/words", {
        method: "GET",
      });
      const res = await response.json();
      if (res) {
        setData(res);
        setFilteredData(res);
      }
    }
    fetchData && (fetchWords(), setFetchData(false));
  }, [fetchData]);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.wordFirstLang.toLowerCase().includes(lowercasedTerm) ||
        item.wordSecondLang.toLowerCase().includes(lowercasedTerm) ||
        (item.sentenceFirstLang &&
          item.sentenceFirstLang.toLowerCase().includes(lowercasedTerm)) ||
        (item.sentenceSecondLang &&
          item.sentenceSecondLang.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentFormData, setCurrentFormData] = useState<FormData>({
    id: null,
    word: null,
    example_sentence: null,
    translated_example_sentence: null,
    translation: null,
  });

  return (
    <div className={`bg-white text-black`}>
      <div className="flex flex-col mx-auto my-0 w-full max-w-[1440px]">
        <div className="flex justify-between items-center px-24 py-3 max-md:px-6 max-md:py-4 max-sm:p-4">
          <div className="text-xl font-semibold text-gray-800">
            Content Management System
          </div>
          <div className="flex gap-2 items-center px-4 py-2.5 text-base text-white bg-gray-700 rounded-lg cursor-pointer">
            <FaFileSignature size={22} />
            <span>Recent Activity</span>
          </div>
        </div>
        <div className="px-24 min-h-[calc(100vh_-_65px)] max-md:p-6">
          <div className="flex gap-4 p-4 mb-1 max-md:flex-col">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search words or phrases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-3 pl-4 w-full text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
              />
            </div>
          </div>
          <div className="overflow-hidden bg-white rounded-lg shadow-sm mb-4">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-3.5 text-xs font-medium text-left text-gray-500 border-b border-gray-300">
                    Word
                  </th>
                  <th className="px-6 py-3.5 text-xs font-medium text-left text-gray-500 border-b border-gray-300">
                    Translation
                  </th>
                  <th className="px-6 py-3.5 text-xs font-medium text-left text-gray-500 border-b border-gray-300">
                    Example
                  </th>
                  <th className="px-6 py-3.5 text-xs font-medium text-left text-gray-500 border-b border-gray-300">
                    Translated Example
                  </th>
                  <th className="px-6 py-3.5 text-xs font-medium text-center text-gray-500 border-b border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-5 text-base text-black">
                      {item.wordFirstLang}
                    </td>
                    <td className="px-6 py-5 text-base text-black">
                      {item.wordSecondLang}
                    </td>
                    <td className="px-6 py-5 text-base text-black">
                      {item.sentenceFirstLang || "No Example!"}
                    </td>
                    <td className="px-6 py-5 text-base text-black">
                      {item.sentenceSecondLang || "No Translated Example!"}
                    </td>
                    <td className="px-6 py-5 text-base text-black">
                      <div className="flex justify-center items-center gap-3">
                        <BiEdit
                          onClick={() => (
                            setShowEditModal(true),
                            setCurrentFormData({
                              word: item.wordFirstLang,
                              example_sentence: item.sentenceFirstLang,
                              translated_example_sentence:
                                item.sentenceSecondLang,
                              translation: item.wordSecondLang,
                              id: Number(item.id),
                            })
                          )}
                          size={26}
                          className="text-indigo-600 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center px-6 py-3.5 bg-white border-t border-gray-300 max-sm:flex-col max-sm:gap-4">
              <div className="text-sm text-gray-700">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
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
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditEntryModal
          currentData={currentFormData}
          setShowEditModal={setShowEditModal}
          setFetchData={setFetchData}
        />
      )}
    </div>
  );
}
