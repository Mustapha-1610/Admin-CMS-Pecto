import { useState, useEffect } from "react";

export const useFetchData = () => {
  const [data, setData] = useState<any[]>([]);
  const [fetchData, setFetchData] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const response = await fetch("http://localhost:5000/api/words", {
        method: "GET",
      });
      const result = await response.json();
      if (result) setData(result);
    };
    if (fetchData) {
      fetchDataFromAPI();
      setFetchData(false);
    }
  }, [fetchData]);

  return { data, setFetchData };
};
