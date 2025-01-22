"use client";
import { useState } from "react";
import EditEntryModal, { FormData } from "./components/edit-entry-modal";
import DataTable from "./components/data-table";
import { useFetchData } from "./hooks/useFetchData";
import { useFilterData } from "./hooks/useFilterData";
import { usePagination } from "./hooks/usePagination";
import Header from "./components/header";
import FilterInput from "./components/filter-input";
import TableControls from "./components/table-controls";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentFormData, setCurrentFormData] = useState<FormData>({
    id: null,
    word: null,
    example_sentence: null,
    translated_example_sentence: null,
    translation: null,
  });

  const { data, setFetchData } = useFetchData();
  const filteredData = useFilterData(data, searchTerm);
  const {
    currentPage,
    totalPages,
    currentData,
    handleNextPage,
    handlePrevPage,
  } = usePagination(filteredData, 10);

  return (
    <div className={`bg-white text-black`}>
      <div className="flex flex-col mx-auto my-0 w-full max-w-[1440px]">
        <Header />
        <div className="px-24 min-h-[calc(100vh_-_65px)] max-md:p-6">
          <FilterInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="overflow-hidden bg-white rounded-lg shadow-sm mb-4">
            <DataTable
              currentData={currentData}
              setCurrentFormData={setCurrentFormData}
              setShowEditModal={setShowEditModal}
            />
            <TableControls
              currentPage={currentPage}
              filteredData={filteredData}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              totalPages={totalPages}
            />
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
