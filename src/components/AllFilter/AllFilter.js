import { TextField } from "@mui/material";
import { top100Films } from "../../utils/staticData";
import Filter from "../Filter/Filter"
import "./AllFilter.css"

function AllFilter() {
  return (
    <>
      <div className="filters">
        <Filter
          options={top100Films}
          placeholder="Roles"
          label="Roles"
          className="rolesFilter"
        />
        <Filter
          options={top100Films}
          placeholder="Number of Employees"
          label="No of Employees"
          className="employeesFilter"
        />
        <Filter
          options={top100Films}
          placeholder="Experience"
          label="Experience"
          className="expFilter"
        />
        <Filter
          options={top100Films}
          placeholder="Remote"
          label="Remote"
          className="remoteFilter"
        />
        <Filter
          options={top100Films}
          placeholder="Tech Stack"
          label="Tech Stack"
          className="tStackFilter"
        />
        <Filter
          options={top100Films}
          placeholder="Minimum Base Pay Salary"
          label="Min Base Pay"
          className="basePayFilter"
        />
        <TextField
          id="outlined-basic"
          label="Search Company Name"
          variant="outlined"
          placeholder="Search Company Name"
          className="searchFilter"
        />
      </div>
    </>
  );
}

export default AllFilter;
