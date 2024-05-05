import { TextField } from "@mui/material";
import {
  experience,
  location,
  minBasePay,
  numberOfEmployees,
  roles,
} from "../../utils/staticData";
import Filter from "../Filter/Filter";
import "./AllFilter.css";
import { useEffect, useState } from "react";

function AllFilter(props) {
  const [allRoles, setAllRoles] = useState([]);
  const [allExp, setAllExp] = useState([]);
  const [allMinBase, setAllMinBase] = useState([]);
  const [allNoOfEmp, setAllNoOfEmp] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [allCompany, setAllCompany] = useState([]);
  
  useEffect(() => {
    props.setFilterData({
      allRoles: allRoles,
      allExp: allExp,
      allMinBase: allMinBase,
      allNoOfEmp: allNoOfEmp,
      allLocation: allLocation,
      allCompany: allCompany
    });
  }, [setAllRoles, setAllExp, setAllMinBase, setAllNoOfEmp, setAllLocation, setAllCompany]);

  return (
    <>
      <div className="filters">
        <Filter
          options={roles}
          placeholder="Roles"
          label="Roles"
          value={allRoles}
          setValue={setAllRoles}
        />
        <Filter
          options={numberOfEmployees}
          placeholder="Number of Employees"
          label="No of Employees"
          value={allNoOfEmp}
          setValue={setAllNoOfEmp}
        />
        <Filter
          options={experience}
          placeholder="Experience"
          label="Experience"
          value={allExp}
          setValue={setAllExp}
        />
        <Filter
          options={location}
          placeholder="Remote"
          label="Remote"
          value={allLocation}
          setValue={setAllLocation}
        />
        <Filter
          options={minBasePay}
          placeholder="Minimum Base Pay Salary"
          label="Min Base Pay"
          value={allMinBase}
          setValue={setAllMinBase}
        />
        <TextField
          id="outlined-basic"
          label="Search Company Name"
          variant="outlined"
          placeholder="Search Company Name"
          onChange={(e) => {
            setAllCompany(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default AllFilter;
