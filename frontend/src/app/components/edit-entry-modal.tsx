import React, { useState } from "react";

interface Props {
  setShowEditModal: (show: boolean) => void;
  selectedEntry: FormData;
  setFetchData: (fetchData: boolean) => void;
}
export interface FormData {
  id: number | null;
  word: string | null;
  translation: string | null;
  example_sentence: string | null;
  translated_example_sentence: string | null;
}

export default function EditEntryModal({
  setShowEditModal,
  selectedEntry,
  setFetchData,
}: Props) {
  const [updatedEntry, setUpdatedEntry] = useState<FormData>({
    id: selectedEntry.id,
    word: "",
    example_sentence: "",
    translated_example_sentence: "",
    translation: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  async function editEntry() {
    setLoading(true);
    errMessage && setErrMessage("");

    if (
      updatedEntry.word === "" &&
      updatedEntry.example_sentence === "" &&
      updatedEntry.translated_example_sentence === "" &&
      updatedEntry.translation === ""
    ) {
      setShowEditModal(false);
    } else if (
      (updatedEntry.word && !updatedEntry.translation) ||
      (!updatedEntry.word && updatedEntry.translation)
    ) {
      setErrMessage(
        "Cannot edit word without its translation or original meaning"
      );
    } else if (
      (updatedEntry.example_sentence &&
        !updatedEntry.translated_example_sentence) ||
      (!updatedEntry.example_sentence &&
        updatedEntry.translated_example_sentence)
    )
      setErrMessage(
        "Cannot edit example without its translation or original meaning"
      );
    else {
      const response = await fetch(
        `http://localhost:5000/api/words/${selectedEntry.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wordFirstLang: updatedEntry.word,
            sentenceFirstLang: updatedEntry.example_sentence,
            wordSecondLang: updatedEntry.translation,
            sentenceSecondLang: updatedEntry.translated_example_sentence,
          }),
        }
      );
      response.ok && (setFetchData(true), setShowEditModal(false));
    }
    setLoading(false);
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-1/3 shadow-lg">
        <p className="text-red-500 mb-2">{errMessage}</p>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Word
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
              placeholder={selectedEntry.word || "Enter word"}
              onChange={(e) => {
                setUpdatedEntry({ ...updatedEntry, word: e.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Translation
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
              placeholder={selectedEntry.translation || "Enter translation"}
              onChange={(e) => {
                setUpdatedEntry({
                  ...updatedEntry,
                  translation: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Example
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
              placeholder={
                selectedEntry.example_sentence || "Enter example sentence"
              }
              onChange={(e) => {
                setUpdatedEntry({
                  ...updatedEntry,
                  example_sentence: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Translated Example
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-base bg-gray-50 text-gray-800 border border-solid rounded-lg"
              placeholder={
                selectedEntry.translated_example_sentence ||
                "Enter translated example sentence"
              }
              onChange={(e) => {
                setUpdatedEntry({
                  ...updatedEntry,
                  translated_example_sentence: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${
                loading
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={editEntry}
              disabled={loading}
            >
              Confirm
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${
                loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setShowEditModal(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
