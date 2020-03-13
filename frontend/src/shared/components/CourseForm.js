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
    width: "40%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "30%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    float: "right",
  },
  boxField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

export default function AddCourseForm(props) {
  const classes = useStyles();
  
  const defaultValueMap = props.defaultValueMap || {};
  const [courseInfo, setCourseInfo] = React.useState({...defaultValueMap});
  const handleTermChange = event => {
    setCourseInfo({...courseInfo, term: event.target.value});
  };
  const handleNameChange = event => {
    setCourseInfo({...courseInfo, name: event.target.value});
  }
  const handleDescriptionChange = event => {
    setCourseInfo({...courseInfo, description: event.target.value})
  }
  return (
    <div >
      <div className={classes.root}>
      <TextField
        label="Course Name"
        id="Course-Name"
        className={classes.textField}
        color='secondary'
        onBlur={handleNameChange}
        defaultValue={defaultValueMap && defaultValueMap["name"]}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="add-course-model">Term</InputLabel>
        <Select
          id="Term"
          value={courseInfo.term}
          onChange={handleTermChange}
          color='secondary'
          defaultValue={defaultValueMap && defaultValueMap["term"]}
        >
          <MenuItem value={"spring"}>Spring 2020</MenuItem>
          <MenuItem value={"summer"}>Summer 2020</MenuItem>
          <MenuItem value={"fall"}>Fall 2020</MenuItem>
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
          onBlur={handleDescriptionChange}
          defaultValue={defaultValueMap && defaultValueMap["description"]}
      />
      </div>
      <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => props.onSubmit(courseInfo)}
      >
        {props.buttonTitle}
      </Button>
    </div>
  );
}
