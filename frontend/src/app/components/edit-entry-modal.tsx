import React from "react";
import { FormData, useEditEntry } from "../hooks/useEditEntry";

interface Props {
  setShowEditModal: (show: boolean) => void; // Function to toggle modal visibility.
  selectedEntry: FormData; // The entry currently being edited.
  setFetchData: (fetchData: boolean) => void; // Function to trigger data refetch.
}

export default function EditEntryModal({
  setShowEditModal,
  selectedEntry,
  setFetchData,
}: Props) {
  const { updatedEntry, setUpdatedEntry, loading, errMessage, editEntry } =
    useEditEntry(selectedEntry, setFetchData, setShowEditModal);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-1/3 shadow-lg">
        {/* Display error message if any */}
        <p className="text-red-500 mb-2">{errMessage}</p>

        <form>
          {/* Dynamically render input fields */}
          {[
            "word",
            "translation",
            "example_sentence",
            "translated_example_sentence",
          ].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {field.replace(/_/g, " ")}{" "}
                {/* Convert field name to a readable label */}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
                placeholder={
                  String(selectedEntry[field as keyof FormData]) || "" // Use selectedEntry as placeholder text.
                }
                onChange={(e) =>
                  setUpdatedEntry({
                    ...updatedEntry,
                    [field]: e.target.value, // Update the corresponding field in the state.
                  })
                }
              />
            </div>
          ))}

          {/* Buttons for confirmation and cancellation */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${
                loading
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={editEntry} // Trigger edit function.
              disabled={loading} // Disable button during loading state.
            >
              {loading ? "Loading ..." : "Confirm"}
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${
                loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setShowEditModal(false)} // Close modal on cancel.
              disabled={loading} // Disable button during loading state.
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
