import { useState, useEffect } from "react";

// Custom hook to filter data based on a search term
export const useFilterData = (data: any[], searchTerm: string) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.wordFirstLang.toLowerCase().includes(lowercasedTerm) || // Filter by word in first language
        item.wordSecondLang.toLowerCase().includes(lowercasedTerm) || // Filter by word in second language
        (item.sentenceFirstLang &&
          item.sentenceFirstLang.toLowerCase().includes(lowercasedTerm)) || // Filter by sentence in first language
        (item.sentenceSecondLang &&
          item.sentenceSecondLang.toLowerCase().includes(lowercasedTerm)) // Filter by sentence in second language
    );
    setFilteredData(filtered); // Set filtered data to state
  }, [searchTerm, data]); // Runs when search term or data changes

  return filteredData; // Return filtered data
};
