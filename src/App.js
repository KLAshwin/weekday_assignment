import { useState, useEffect } from "react";
import JobCard from "./components/JobCard/JobCard";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import AllFilter from "./components/AllFilter/AllFilter";

function App() {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on initial component mount

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [jobData]); // Add/remove scroll event listener when jobData changes

  const fetchData = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: (page - 1) * 10, // Calculate offset based on page number
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setJobData((prevData) => [...prevData, ...result.jdList]); // Append new data to existing data
        setLoading(false);
        setPage((prevPage) => prevPage + 1); // Increment page number
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      fetchData(); // Fetch more data when user scrolls to the bottom
    }
  };
  return (
    <>
      <AllFilter />

      {jobData.map((item, idx) => (
        <JobCard item={item} idx={idx} />
      ))}

      {loading && <CircularProgress />}
    </>
  );
}

export default App;
