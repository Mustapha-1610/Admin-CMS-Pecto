import { useState, useEffect } from "react";

export const useFilterData = (data: any[], searchTerm: string) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);

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
  }, [searchTerm, data]);

  return filteredData;
};
