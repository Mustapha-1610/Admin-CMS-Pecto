import { useState } from "react";

export interface FormData {
  id: number | null;
  word: string | null;
  translation: string | null;
  example_sentence: string | null;
  translated_example_sentence: string | null;
}

export interface EditEntryHook {
  updatedEntry: FormData;
  setUpdatedEntry: React.Dispatch<React.SetStateAction<FormData>>;
  loading: boolean;
  errMessage: string;
  editEntry: () => Promise<void>;
}

export function useEditEntry(
  selectedEntry: FormData,
  setFetchData: (fetchData: boolean) => void,
  setShowEditModal: (show: boolean) => void
): EditEntryHook {
  const [updatedEntry, setUpdatedEntry] = useState<FormData>({
    id: selectedEntry.id,
    word: "",
    example_sentence: "",
    translated_example_sentence: "",
    translation: "",
  });

  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function editEntry() {
    setLoading(true);
    setErrMessage("");

    // Validation logic
    if (
      updatedEntry.word === "" &&
      updatedEntry.example_sentence === "" &&
      updatedEntry.translated_example_sentence === "" &&
      updatedEntry.translation === ""
    ) {
      setShowEditModal(false);
      return;
    }

    if (
      (updatedEntry.word && !updatedEntry.translation) ||
      (!updatedEntry.word && updatedEntry.translation)
    ) {
      setErrMessage(
        "Cannot edit word without its translation or original meaning."
      );
      setLoading(false);
      return;
    }

    if (
      (updatedEntry.example_sentence &&
        !updatedEntry.translated_example_sentence) ||
      (!updatedEntry.example_sentence &&
        updatedEntry.translated_example_sentence)
    ) {
      setErrMessage(
        "Cannot edit example without its translation or original meaning."
      );
      setLoading(false);
      return;
    }

    // API Call
    try {
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

      if (response.ok) {
        setFetchData(true);
        setShowEditModal(false);
      } else {
        const errorData = await response.json();
        setErrMessage(errorData.error || "Failed to update entry.");
      }
    } catch (error) {
      setErrMessage("An unexpected error occurred.");
    }

    setLoading(false);
  }

  return { updatedEntry, setUpdatedEntry, loading, errMessage, editEntry };
}
