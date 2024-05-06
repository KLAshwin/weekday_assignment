import { useState, useEffect } from "react";
import JobCard from "./components/JobCard/JobCard";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import "./App.css";
import AllFilter from "./components/AllFilter/AllFilter";

function App() {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState([]);

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
        console.log(jobData);
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
        document.documentElement.offsetHeight &&
      loading
    ) {
      fetchData(); // Fetch more data when user scrolls to the bottom
    }
  };

  return (
    <>
      <AllFilter filterData={filterData} setFilterData={setFilterData} />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {jobData
          .filter((item) => {
            const roleFilterPassed =
              filterData.allRoles.length === 0 ||
              filterData.allRoles.includes(item.jobRole);
            const companyFilterPassed =
              filterData.allCompany.length === 0 ||
              filterData.allCompany.includes(item.companyName);
            return roleFilterPassed && companyFilterPassed;
          })
          .map((item, idx) => (
            <JobCard item={item} idx={idx} />
          ))}
      </div>

      {loading && <CircularProgress />}
    </>
  );
}

export default App;
