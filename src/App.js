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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight &&
      !loading
    ) {
      fetchData();
    }
  };

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
            let searchCheck = false;
            const roleFilterPassed =
              filterData.allRoles.length === 0 ||
              filterData.allRoles.includes(item.jobRole);

            for (let i = 0; i < filterData.allCompany.length; i++) {
              console.log(filterData.allCompany[i], item.companyName.toLowerCase(), filterData.allCompany[i].startsWith(
                item.companyName.toLowerCase()
              ));
              if (
                item.companyName.toLowerCase().startsWith(
                  filterData.allCompany[i]
                )
              ) {
                searchCheck = true;
                break;
              }
            }

            const companyFilterPassed =
              filterData.allCompany.length === 0 ||
              searchCheck;

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
