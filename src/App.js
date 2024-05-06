import { useState, useEffect, useRef } from "react";
import JobCard from "./components/JobCard/JobCard";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import AllFilter from "./components/AllFilter/AllFilter";

function App() {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (
        container.scrollHeight - container.scrollTop === container.clientHeight
      ) {
        fetchData();
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: (page - 1) * 10,
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
        setJobData((prevData) => [...prevData, ...result.jdList]);
        setLoading(false);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      <AllFilter filterData={filterData} setFilterData={setFilterData} />

      <div ref={containerRef} style={{ display: "flex", flexWrap: "wrap" }}>
        {jobData
          .filter((item) => {
            const roleFilterPassed =
              filterData.allRoles.length === 0 ||
              filterData.allRoles.includes(item.jobRole);
            const companyFilterPassed =
              filterData.allCompany.length === 0 ||
              filterData.allCompany.includes(item.companyName.toLowerCase());
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
