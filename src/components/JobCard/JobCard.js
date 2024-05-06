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
      <DemoPaper variant="elevation" sx={{margin: "4px 20px 20px 4px"}}>
        <img src={props.item.logoUrl} alt={props.item.companyName} />
        <div>
          <div>{props.item.companyName}</div>
          <div>{props.item.jobRole}</div>
          <div>{props.item.remote}</div>

          <div>
            Estimated Salary: {props.item.minJdSalary} -{" "}
            {props.item.maxJdSalary} LPA
          </div>

          <div>
            <div>About Company:</div>
            <div>About us</div>
            <div style={{height: "100px", overflow: "hidden"}}>{props.item.jobDetailsFromCompany}</div>
          </div>
          <div>
            <div>Minimum Experience</div>
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
