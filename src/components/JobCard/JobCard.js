import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 290,
  height: "auto",
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

function JobCard(props) {
  return (
    <>
      <DemoPaper variant="elevation" sx={{ margin: "4px 20px 20px 4px" }}>
        <img src={props.item.logoUrl} alt={props.item.companyName} />
        <div>
          <div style={{ fontWeight: "bold" }}>{props.item.companyName}</div>
          <div style={{ fontWeight: "bold" }}>{props.item.jobRole}</div>
          <div style={{ fontWeight: "bold" }}>{props.item.remote}</div>

          <div>
            <span style={{ fontWeight: "bold" }}>Estimated Salary: </span>
            {props.item.minJdSalary} - {props.item.maxJdSalary} LPA
          </div>

          <div>
            <div style={{ fontWeight: "bold" }}>About Company:</div>
            <div style={{ fontWeight: "bold" }}>About us</div>
            <div style={{ height: "100px", overflow: "hidden" }}>
              {props.item.jobDetailsFromCompany}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: "bold" }}>Minimum Experience</div>
            <div>{props.item.minExp} years</div>
          </div>

          <Button variant="contained" color="success">
            Easy Apply
          </Button>
          <Button variant="contained">Unlock referral asks</Button>
        </div>
      </DemoPaper>
    </>
  );
}

export default JobCard;
