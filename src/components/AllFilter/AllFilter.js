import { TextField } from "@mui/material";
import { top100Films } from "../../utils/staticData";
import Filter from "../Filter/Filter";
import "./AllFilter.css";

function AllFilter() {
  return (
    <>
      <div className="filters">
        <Filter options={top100Films} placeholder="Roles" label="Roles" />
        <Filter
          options={top100Films}
          placeholder="Number of Employees"
          label="No of Employees"
        />
        <Filter
          options={top100Films}
          placeholder="Experience"
          label="Experience"
        />
        <Filter options={top100Films} placeholder="Remote" label="Remote" />
        <Filter
          options={top100Films}
          placeholder="Tech Stack"
          label="Tech Stack"
        />
        <Filter
          options={top100Films}
          placeholder="Minimum Base Pay Salary"
          label="Min Base Pay"
        />
        <TextField
          id="outlined-basic"
          label="Search Company Name"
          variant="outlined"
          placeholder="Search Company Name"
        />
      </div>
    </>
  );
}

export default AllFilter;
