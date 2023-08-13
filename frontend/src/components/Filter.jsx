import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    top: -24,
  },
}));

const Filter = ({ handleSort, handleFilters, sort }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: { width: "25%" },
        }}
      >
        <Typography className={classes.typography}>
          <h6>Sort by</h6>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                value="name"
                checked={sort.includes("name")}
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                value="price"
                checked={sort.includes("price")}
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Price"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                value="averageRating"
                checked={sort.includes("averageRating")}
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Rating"
          />
          <FormControl
            variant="outlined"
            className={classes.formControl + "mt-5 w-100 h-75"}
          >
            <InputLabel>Category</InputLabel>
            <Select
              defaultValue=""
              label="Vategory"
              onChange={(e) => handleFilters("category", e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Pants">Pants</MenuItem>
              <MenuItem value="Vest">Vest</MenuItem>
              <MenuItem value="Shirt">Shirt</MenuItem>
            </Select>
          </FormControl>
        </Typography>
      </Popover>
    </div>
  );
};

export default Filter;
