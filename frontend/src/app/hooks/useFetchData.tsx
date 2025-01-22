import { useState, useEffect } from "react";

// Custom hook to fetch data from the API
export const useFetchData = () => {
  const [data, setData] = useState<any[]>([]);
  const [fetchData, setFetchData] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const response = await fetch("http://localhost:5000/api/words", {
        method: "GET",
      });
      const result = await response.json();
      if (result) setData(result); // Set fetched data to state
    };

    if (fetchData) {
      fetchDataFromAPI();
      setFetchData(false); // Prevent re-fetching once data is set
    }
  }, [fetchData]); // Runs whenever `fetchData` changes

  return { data, setFetchData };
};
