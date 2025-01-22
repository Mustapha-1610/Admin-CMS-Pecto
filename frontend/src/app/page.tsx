"use client";
import { useState } from "react";

import EditEntryModal from "./components/edit-entry-modal";
import DataTable from "./components/data-table";
import { useFetchData } from "./hooks/useFetchData";
import { useFilterData } from "./hooks/useFilterData";
import { usePagination } from "./hooks/usePagination";
import Header from "./components/header";
import FilterInput from "./components/filter-input";
import TableControls from "./components/table-controls";
import { FormData } from "./hooks/useEditEntry";

export default function Home() {
  // State for search term input and modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<FormData>({
    id: null,
    word: null,
    example_sentence: null,
    translated_example_sentence: null,
    translation: null,
  });

  // Fetch data from the API
  const { data, setFetchData } = useFetchData();

  // Filter data based on the search term
  const filteredData = useFilterData(data, searchTerm);

  // Pagination logic: handling current page and items per page
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
          {/* Filter input field */}
          <FilterInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="overflow-hidden bg-white rounded-lg shadow-sm mb-4">
            {/* Data table component */}
            <DataTable
              tableData={currentData}
              setSelectedEntry={setSelectedEntry}
              setShowEditModal={setShowEditModal}
            />
            {/* Table controls for pagination */}
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
      {/* Edit modal for editing entry */}
      {showEditModal && (
        <EditEntryModal
          selectedEntry={selectedEntry}
          setShowEditModal={setShowEditModal}
          setFetchData={setFetchData}
        />
      )}
    </div>
  );
}
