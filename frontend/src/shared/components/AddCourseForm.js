import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  boxField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 700,
  },
}));

export default function AddCourseForm() {
  const classes = useStyles();
  
  const [term, setTerm] = React.useState('');
  const handleChange = event => {
    setTerm(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div>
      <TextField
        label="Course Name"
        id="Course-Name"
        className={classes.textField}
        color='secondary'
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="add-course-model">Term</InputLabel>
        <Select
          id="Term"
          value={term}
          onChange={handleChange}
          color='secondary'
        >
          <MenuItem value={10}>Spring 2020</MenuItem>
          <MenuItem value={20}>Summer 2020</MenuItem>
          <MenuItem value={30}>Fall 2020</MenuItem>
        </Select>
      </FormControl>
      </div>
      <div>
      <TextField
          label="Course Description"
          id="course-description"
          className={classes.boxField} 
          fullWidth
          multiline
          rowsMax="10"
          margin="dense"
          color='secondary'
      />
      </div>
      <Button
          type="submit"
          size="small "
          variant="contained"
          color="primary"
          className={classes.submit}
      >
        Create Course
      </Button>
    </div>
  );
}
