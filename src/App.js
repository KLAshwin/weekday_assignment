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
  }, [loading]);

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
        console.log(jobData);
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
      <h3>
        The filters for roles, experience, and search company name are synchronized
        with the rendering of data, ensuring that only items matching the
        selected filters are displayed.
      </h3>

      <AllFilter filterData={filterData} setFilterData={setFilterData} />

      <div ref={containerRef} style={{ display: "flex", flexWrap: "wrap" }}>
        {jobData
          .filter((item) => {
            let searchCheck = false;
            let expCheck = false;
            let baseCheck = false;

            const roleFilterPassed =
              filterData.allRoles.length === 0 ||
              filterData.allRoles.includes(item.jobRole);

            for (let i = 0; i < filterData.allCompany.length; i++) {
              if (
                item.companyName
                  .toLowerCase()
                  .startsWith(filterData.allCompany[i])
              ) {
                searchCheck = true;
                break;
              }
            }

            for (let i = 0; i < filterData.allExp.length; i++) {
              if (item.minExp > filterData.allExp[i]) {
                expCheck = true;
                break;
              }
            }

            // for (let i = 0; i < filterData.allMinBase.length; i++) {
            //   console.log(item.minJdSalary, filterData.allMinBase[i]?.substring(0, filterData.allMinBase[i]?.length - 1));
            //   if (
            //     item.minJdSalary?.substring(0, item.minJdSalary.length - 1) >
            //     filterData.allMinBase[i]
            //   ) {
            //     baseCheck = true;
            //     break;
            //   }
            // }

            const companyFilterPassed =
              filterData.allCompany.length === 0 || searchCheck;

            const expFilterPassed = filterData.allExp.length === 0 || expCheck;

            // const baseFilterPassed =
            //   filterData.allMinBase.length === 0 || baseCheck;

            return roleFilterPassed && companyFilterPassed && expFilterPassed;
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
