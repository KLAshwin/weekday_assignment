import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function Filter(props) {
  return (
    <>
      <Autocomplete 
        multiple
        id="tags-outlined"
        options={props.options}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            placeholder={props.placeholder}
          />
        )}
        sx={{ width: "20vw" }}
      />
    </>
  );
}

export default Filter;
