import React, { useState } from "react";

export default function EditEntryModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-1/3 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Entry
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Word/Phrase
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
              placeholder="Enter word or phrase"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Translation
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
              placeholder="Enter translation"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Example
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
              placeholder="Enter example sentence"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Translated Example
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
              placeholder="Enter translated example"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              onClick={() => setShowModal(false)}
            >
              Confirm
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-200"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
