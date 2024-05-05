import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function JobCard(props) {
  return (
    <>
      <Card key={props.idx} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.item.companyName}
          </Typography>
          <Typography variant="h5" component="div">
            {props.item.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.item.subtitle}
          </Typography>
          <Typography variant="body2">{props.item.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default JobCard;
